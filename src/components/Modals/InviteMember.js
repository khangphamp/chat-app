import React, { useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/sevives';
import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DeBounceSelect({ fetchOptions, debounceTimeout=400,...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debouceFetcher = React.useMemo(() => {
        const loadOptions =(value => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        })
        return debounce(loadOptions,debounceTimeout)
    },[debounceTimeout,fetchOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch = { debouceFetcher }
            notFoundContent={ fetching? <Spin size="small" /> : null}
            {...props}
        >
            {
                options.map(opt => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.title}>
                        <Avatar src={opt.photoURL} size="small">
                            {opt.photoURL? '':opt.label?.charAt(0).toUpperCase()}
                        </Avatar>
                        {`${opt.label}`}
                    </Select.Option>
                ))

            }
        </Select>
    )
}

 async function fetchUserList(search, curMembers) {
    return db
        .collection('users')
        .where('keywords','array-contains',search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            })).filter(opt => !curMembers.includes(opt.value))
        })
    }

export default function InviteMemberModel() {
  const { isInviteMemberVisible, setIsInviteMemberVisible ,selectedRoomId, selectedRoom} = React.useContext(AppContext);
  const { uid } = React.useContext(AuthContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
    const handleOk = () => {
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members,...value.map(val => val.value)],
        })
        setIsInviteMemberVisible(false);
        form.resetFields();
    }
    const handleCancel = () => {
        setIsInviteMemberVisible(false);
    }
  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}

      >
        <Form form={form} layout='vertical'>
            <DeBounceSelect
                mode='multiple'
                label='Tên các thành viên'
                value={value}
                placeholder='Nhập tên các thành viên'
                fetchOptions={ fetchUserList }
                onChange= {newValue => setValue(newValue)}
                style = {{ width: '100%'}}
                curMembers = {selectedRoom.members}
            />
        </Form>
      </Modal>
    </div>
  )
}