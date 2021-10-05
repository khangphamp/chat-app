import React, { useEffect,useState } from 'react'

import { auth } from '../firebase/config';
import { useHistory } from 'react-router';
import { Spin } from 'antd';

export const AuthContext = React.createContext();
function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {

        const unsubscibed =auth.onAuthStateChanged(user => {
            if(user){
                const { displayName, email, uid, photoURL} = user;
                setUser({
                    displayName, email, uid, photoURL
                })
               
                setIsLoading(false);
                history.push('/');
            }else {
     

                setIsLoading(false);
                history.push('/login');
            }
        })
        return () => {
            unsubscibed();
         };
    },[history])
    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin /> :children}
        </AuthContext.Provider>
     )
}

export default AuthProvider

