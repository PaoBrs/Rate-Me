import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'

const Heading = styles.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
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
