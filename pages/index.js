import React, {useEffect, useState, useContext} from 'react'
import { FirebaseContext } from '../firebase'
import Layout from '../components/layouts/Layout'
import DetailsManga from '../components/layouts/DetailsManga'
import styles from '@emotion/styled'
import { getFirestore, onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase';
import RateMe from '../components/layouts/RateMe'
import Footer from '../components/layouts/Footer'


const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function Home() {

const [mangas, setMangas] = useState([]);

const {Firebase} = useContext(FirebaseContext);

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

  console.log(mangas)

  return (
    <div>
      <Layout>
        <RateMe />
      <div className="manga-list">
        <div className="container">
          <div className="bg-dark flex flex-row flex-wrap gap-4">
            { mangas.map(manga => (
              <DetailsManga 
              key={manga.id} manga={manga} 
              />

            ))}

          </div>
        </div>
      </div>
    
      <Footer />
      </Layout>
    </div>
  )
}
