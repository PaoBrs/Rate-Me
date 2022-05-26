import React from 'react'
import Layout from '../components/layouts/Layout'
import DetailsManga from '../components/layouts/DetailsManga'
import styles from '@emotion/styled'
import { db } from '../firebase/firebase';


import useManga from '../hooks/useManga'


const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function Popular() {

const {mangas} = useManga();

console.log(mangas);

  
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
