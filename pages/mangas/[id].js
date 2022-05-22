import React, {useEffect, useContext, useState} from 'react'
import { useRouter } from 'next/router';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';

import {FirebaseContext} from '../../firebase';
import { onSnapshot } from 'firebase/firestore';
import { getFirestore, collection } from 'firebase/firestore'


const Manga =() => {

  const [manga, setManga] = useState({});
  const [error, setError] = useState(false);

  const router = useRouter();
  const  {id} = router.query;
  // const {query: {id}}=router;

  const {firebase} = useContext(FirebaseContext);

  const db = getFirestore();

  useEffect(() => {
    if (id) {
      const getManga = async () => {
        onSnapshot(collection(db, 'mangas'), (snapshot) => {
          const manga = snapshot.docs.find(doc => doc.id === id);
          if (manga) {
            setManga(manga.data());
          } else {
            setError(true);
          }
          // setManga(snapshot.docs.find(doc => doc.id === id)[0].data());
        })
      }
      getManga();
    }
  }, [id])

  return (
    <Layout>
      <>
      {error && <Error404 />}
      </>
    </Layout>
  )
}

export default Manga; 