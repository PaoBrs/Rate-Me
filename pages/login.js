import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'
import Link from 'next/link'
import {Form, InputSubmit, Container, Error, Message} from '../components/ui/Form'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {css} from '@emotion/react'

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';


const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

const INITIAL_STATE={
  email: '',
  password: ''
}

export default function Login() {

  const [errorUser, setErrorUser] = useState(false);

  const {value, error, handleChange, handleSubmit, handleBlur} = useValidation(INITIAL_STATE, validateLogin, login )

const {email, password} = value;

async function login (){
  const auth = getAuth();
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    
    console.log(user);
    Router.push('/');
  } catch (error) {
    console.error ('Error trying to login', error.message);
    setErrorUser('Error trying to login');
  }
}

  return (
  <div>
    <Layout>
      <Heading>Login</Heading>

    <Form 
    onSubmit={handleSubmit}
    noValidate
    >

  

    <Container>
    <div className="relative z-0 w-full mb-6 group">
      <input
      type="email"
      id="email"
      name='email'
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div> 
    </Container>
{error.email && <Error>{error.email}</Error>}

    <Container>
    <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="password"
          name='password'
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
    </Container>
{error.password && <Error>{error.password}</Error>}
{errorUser && <Error>{errorUser}</Error>}
      
      <InputSubmit
        type="submit"
        value="Login"
      />

      <Message>Or create an account <Link href="/sign-up">
            <button
            css = {css`
              color: var(--orange);
              font-weight: bold;
              &:hover{
                color: #FC4F4F;
              }`}
            >here</button>
            </Link>
      </Message>

      </Form>
      </Layout>
  </div>
  )
}

