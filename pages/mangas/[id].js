import React, {useEffect, useContext, useState} from 'react'
import { useRouter } from 'next/router';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Spinner from '../../components/layouts/Spinner';

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

  if (Object.keys(manga).length === 0) return ( <Spinner />)

  return (
    
    <Layout>
      <>
      {error && <Error404 />}
      <div>
        <h1 
          css={css`
          margin-top: 5rem;
          color: var(--white);
          `}
        >{manga.name}</h1>
      </div>
      </>
    </Layout>
  )

}

export default Manga; 