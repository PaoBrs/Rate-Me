import React, {useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'
import {Form, InputSubmit, Container, Error, Message} from '../components/ui/Form'
import {css} from '@emotion/react'
import Link from 'next/link'

import firebase from '../firebase/firebase';

import useValidation from '../hooks/useValidation';
import validateSignUp from '../validation/validateSignUp';

const INITIAL_STATE={
  name: '',
  email: '',
  password: '',
  role: ''
}

const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function SignUp() {

  const [errorUser, setErrorUser] = useState(false);

  const {value, error, handleChange, handleSubmit, handleBlur} = useValidation(INITIAL_STATE, validateSignUp, createAccount )

const {name, email, password, role} = value;

const {db} = firebase

async function createAccount(){
  try {
    await firebase.register(name, email, password, role)
    Router.push('/');
  } catch (error) {
    console.error ('Error creating user', error.message);
    setErrorUser(error['message']);
  }
}

  return (
  <div>
    <Layout>
      <Heading>Sign Up</Heading>
    <Form 
    onSubmit={handleSubmit}
    noValidate
    >

    <Container>
    <div className="relative z-0 w-full mb-6 group">
      <input 
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={handleChange}
      onBlur={handleBlur}
      className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
  </div>
    </Container>
{error.name && <Error>{error.name}</Error>}

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

<select id = "role" name="role" className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" required>
<option value="admin">Admin</option>
<option value="user">User</option>
</select>
{errorUser && <Error>{errorUser}</Error>}
      
      <InputSubmit
        type="submit"
        value="Create Account"
      />

<Message>Already have an account? <Link href="/sign-up">
            <button
            css = {css`
              color: var(--orange);
              font-weight: bold;
              &:hover{
                color: #FC4F4F;
              }`}
            >login here</button>
            </Link>
      </Message>

      </Form>
      </Layout>
  </div>
  )
}
