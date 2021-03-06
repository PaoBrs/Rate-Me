import React from 'react'
import Header from './Header'
import {Global, css} from '@emotion/react'
import Head from 'next/head'

const Layout = props => {
  return (
    <>
    <Global 
    styles={css`
    :root{
      --gris: #3d3d3d;
      --gris2: #6f6f6f;
      --gris3: #e1e1e1;
      --grayDark: #292A2E;
      --red: #F76E11;
      --white: #fff;
      --lightOrange:#FAEEE0;
      --purple: #A2416B;
      --black: #1F1F1F;
      --orange: #FF9F45;
    }
    
    html{
      font-size: 62.5%;
      box-sizing: border-box;

    }
    *,*::before,*:after{
      box-sizing: inherit;
    }
    body{
      font-size: 1.6rem;
      line-height: 1.5;
      font-family: 'PT Sans', sans-serif;
      background-color: var(--black);
    }
    h1,h2,h3{
      margin: 0 0 2rem 0;
      line-height: 1.5;
    }
    h1,h2{
      font-family: 'Roboto Slab', serif;
      font-weight: 700;
    }
    h3{
      font-family: 'PT Sans', sans-serif;
      font-weight: 700;
    }
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a{
      text-decoration: none;
    }

    textarea{
      height: 200px;
    }
  `}
    />
    <Head>
      <html />
      <title>Rate Me</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
      <link href='/static/css/app.css' rel='stylesheet' />
    </Head>
  <Header />
<main>
  {props.children}
</main>
</>
  )
}
export default Layout