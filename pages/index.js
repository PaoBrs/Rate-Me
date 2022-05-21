import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'

const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
      <Heading>Index</Heading>
    
      </Layout>
    </div>
  )
}
