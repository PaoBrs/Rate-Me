import React, {useEffect, useState} from 'react'
import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'
import { useRouter} from 'next/router'
import DetailsManga from '../components/layouts/DetailsManga'
import useManga from '../hooks/useManga'

const Heading = styles.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default function Search() {
  const router = useRouter()
  const { query:{q}} = router
  
  const {mangas} = useManga();
  const [search, setSearch] = React.useState([])

  useEffect(() => {
    const search = q.toLowerCase();
    const filteredMangas = mangas.filter(manga => {
      return manga.name.toLowerCase().includes(search)
    })
    setSearch(filteredMangas);
  }, [q, mangas])
  

  return (
    <div className={styles.container}>
      <Layout>
      <div className="manga-list">
        <div className="container">
          <div className="bg-dark flex flex-row flex-wrap gap-4">
            { search.map(manga => (
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
