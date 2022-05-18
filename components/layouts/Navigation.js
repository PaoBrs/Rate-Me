import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

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
  return (
<Nav>
<Link href="/">Home</Link>
<Link href="/popular">Popular</Link>
<Link href="/new-manga">Add Manga</Link>
</Nav>
  )
}

export default Navigation
