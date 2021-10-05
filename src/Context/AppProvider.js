import React, { useState } from 'react'

import { AuthContext } from '../Context/AuthProvider';
import useFirestore from '../hook/useFirestore';
export const AppContext = React.createContext();
function AppProvider({children}) {
    const { uid } = React.useContext(AuthContext);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSeletedRoomId] = useState('');

    const roomsCondition =React.useMemo(() => {
        return {
        fieldName: 'members',
        operator:'array-contains',
        compareValue: uid
        }
    },[uid])
    const rooms = useFirestore('rooms',roomsCondition);
         const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId) || {},[rooms, selectedRoomId]);

        const userCondition =React.useMemo(() => {
            return {
            fieldName: 'uid',
            operator:'in',
            compareValue: selectedRoom.members
            }
        },[selectedRoom.members])
        const members = useFirestore('users',userCondition);
   

    return (
       <AppContext.Provider value={
        {rooms,isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSeletedRoomId, members,selectedRoom,isInviteMemberVisible,setIsInviteMemberVisible}}>
           { children }
       </AppContext.Provider>
    )
}

export default AppProvider

