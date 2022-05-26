import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Search from '../ui/Search'
import Navigation from './Navigation'
import Button from '../ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {FirebaseContext} from '../../firebase'


const ContHeader = styled.div`
max-width: 1200px;
width: 95%;
margin: 0 auto;
@media (min-width: 768px){
  display: flex;
  justify-content: space-between;
}
`
const Logo = styled.a`
font-family: 'Roboto Slab', serif;
font-size: 4rem;
font-weight: 700;
line-height: 0;
color: var(--white);
margin-right: 2rem;
`

const Header = props => {

  const {user, firebase} = useContext(FirebaseContext)

  return (
    <>
      <header
        css={css`
        border-bottom: 2px solid var(----grayDark);
        padding: 1rem 0;
        background-color: var(--red);
      `}

      >
      <ContHeader>
      <div
      css = {css`
      display: flex;
      align-items: center;
      `}
      >
        <Link href="/">
        <Logo><FontAwesomeIcon icon={faStar } />R</Logo>
        </Link>
        <Search />
        <Navigation />
      </div>
      <div
      css = {css`
      display: flex;
      align-items: center;
      `}
      >
        {user ? (
          <>
          <p
            css = {css`
            margin-right: 2rem;
            color: var(--white);
            `}
            > logged as : {user.email}</p>
            <Button 
            bgColor="true"
            onClick={() => firebase.logout()}
            >Logout</Button>
          </>
        ):(
          <>
            <Link href="/login">
            <Button
              bgColor="true"
            >Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sing up</Button>
            </Link>
          </>
        ) }
      </div>
      </ContHeader>
      </header>
    </>
  )
}

export default Header