// import app from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import firebaseConfig from './config'

import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';


class Firebase {
  constructor() {
  const app = initializeApp(firebaseConfig)

  this.auth = getAuth(app)
  
  }

  async register(name, email, password){
    try {
      const newUser =  await createUserWithEmailAndPassword(this.auth, email, password)
      return await newUser.user.updateProfile.displayName({displayName: name})
      
    } catch (error) {
      console.error ('Error creating user', error);
    }
  }

  async login(email, password){
    const userlogin = await signInWithEmailAndPassword(this.auth, email, password)
    return await updateProfile(userlogin.user, {displayName: email})
  }

}

const firebase = new Firebase()

export default firebase;