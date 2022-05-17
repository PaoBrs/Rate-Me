import React from 'react'
import Search from '../ui/search'
import Navigation from './Navigation'
import Link from 'next/link'

const Header = props => {
  return (
    <>
      <header>
      <div>
      <div>
        <p> P</p>
        <Search />
        <Navigation />
      </div>
      <div>
        <p> Hola : Paola</p>
        <button type='button'>Logout</button>
        <Link href="/">Login</Link>
        <Link href="/">Sign up</Link>
      </div>
      </div>
      </header>
    </>
  )
}

export default Header