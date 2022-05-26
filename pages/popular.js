import React, {useEffect, useState, useContext} from 'react'
import { FirebaseContext } from '../firebase'
import Layout from '../components/layouts/Layout'
import DetailsManga from '../components/layouts/DetailsManga'
import styles from '@emotion/styled'
import { getFirestore, onSnapshot, collection, orderBy, query, doc, getDoc, startAt, where } from 'firebase/firestore'
import { db } from '../firebase/firebase';
import { useRouter } from 'next/router';


const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function Popular() {

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

  
  return (
    <div>
      <Layout>
      <div className="manga-list">
        <div className="container">
          <div className="bg-dark flex flex-row flex-wrap gap-4">
            { mangas.sort((a, b) => b.rateMe - a.rateMe).map(manga => (
              <DetailsManga 
              key={manga.id} manga={manga} 
              />

            ))}

          </div>
        </div>
      </div>
    
      </Layout>
    </div>
  )
}
