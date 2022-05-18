import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'
import {css} from '@emotion/react'

const Heading = styles.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export default function Login() {
  return (
    <div css={css`
    background-color: var(--black);
    `}
    >
      <Layout>
      <Heading>login</Heading>
      </Layout>
    </div>
  )
}
