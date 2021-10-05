import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/sevives';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible} = React.useContext(AppContext);
  const { uid } = React.useContext(AuthContext);
  const [form] = Form.useForm();
    const handleOk = () => {
        addDocument('rooms',{
            ...form.getFieldsValue(),
            members: [uid],
        })
        setIsAddRoomVisible(false);
        form.resetFields();
    }
    const handleCancel = () => {
        setIsAddRoomVisible(false);
    }
  return (
    <div>
      <Modal
        title='Tạo phòng'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}

      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên phòng' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}