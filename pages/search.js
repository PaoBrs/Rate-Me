import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'

const Heading = styles.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default function Search() {
  return (
    <div className={styles.container}>
      <Layout>
      <Heading>Search</Heading>
      </Layout>
    </div>
  )
}
