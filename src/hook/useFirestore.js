import React, { useState } from 'react'
import { db } from '../firebase/config';

function useFirestore(colection, condition) {
    const [document, setDocument] = useState([]);
React.useEffect(() => {
    let colectionRef = db.collection(colection).orderBy('createdAt');
    if(condition){
        if(!condition.compareValue || !condition.compareValue.length){
            return;
        }
        colectionRef = colectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
       
    }
    const unsubscibed = colectionRef.onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }))
        setDocument(data);
    })
    return unsubscibed;
  },[colection, condition])
    return document;
}

export default useFirestore

