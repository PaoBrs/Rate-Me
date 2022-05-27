import App from 'next/app'
import firebase from '../firebase/firebase';
import {FirebaseContext} from '../firebase';
import useAuth from '../hooks/useAuth'
import {css} from '../styles/globals.css'


const MyApp = props =>{
  const user = useAuth();
  console.log(user);

  const { Component, pageProps } = props;
  return (
  <FirebaseContext.Provider value={{user, firebase}}>
    <Component {...pageProps} />
  </FirebaseContext.Provider>
  )
}

export default MyApp;