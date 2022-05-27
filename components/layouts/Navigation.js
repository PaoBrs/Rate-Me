import React, {useContext} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {FirebaseContext} from '../../firebase'

const Nav= styled.nav`
padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-right: 2rem;
    color: var(--lightOrange);
    font-family:'PT Sans',sans-serif;
  &:hover{
    color: var(--purple);
  }
    &:last-of-type {
      margin-right: 0;
    }
  }
`


const Navigation = () => {
  const {user} = useContext(FirebaseContext)

  // const {email} = user

  console.log(user)

  return (
<Nav>
<Link href="/"><a>Home</a></Link>
<Link href="/popular"><a>Popular</a></Link>

{user && <Link href="/new-manga"><a>Add Manga</a></Link>}

</Nav>
  )
}

export default Navigation
