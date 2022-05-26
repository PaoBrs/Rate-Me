import React, {useState, useEffect, useContext} from 'react'
import {db} from '../firebase/firebase';
import { FirebaseContext } from '../firebase';
import { useRouter } from 'next/router';
import { getFirestore, onSnapshot, collection, orderBy, query, doc, getDoc, startAt, where } from 'firebase/firestore'


const useManga = () => {
  const [mangas, setMangas] = useState([]);

const {Firebase} = useContext(FirebaseContext);

const router = useRouter();
const  {id} = router.query;

const db = getFirestore();

  useEffect(() => {
    
    const getMangas = () => {
    onSnapshot(collection(db, 'mangas'), (snapshot) => {
      setMangas(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }
      ) )
    })
  }
      getMangas();
  }, []);

  return {
    mangas
  }
}

export default useManga;
