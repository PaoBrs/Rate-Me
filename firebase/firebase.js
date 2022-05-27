// import app from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import firebaseConfig from './config'
import 'firebase/firestore'
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';


class Firebase {
  constructor() {
  const app = initializeApp(firebaseConfig);

  this.auth = getAuth(app);
  this.db = getFirestore(app);
  this.storage = getStorage(app);
  
  }

  async register(name, email, password, role){
    try {
      const newUser =  await createUserWithEmailAndPassword(this.auth, email, password).then (user => {
        // return updateProfile(user, {displayName: name})
        return newUser
      })
      // return await newUser.user.updateProfile.displayName({displayName: name,})
      const docuRef = doc(this.db, `Users/ ${newUser.user.uid}`);
      setDoc (docuRef, { name:name, email:email, role:role })
    } catch (error) {
      console.error (error);
    }
  }

  async login(email, password){
    const userlogin = await signInWithEmailAndPassword(this.auth, email, password)
    return await updateProfile(userlogin.user, {displayName: email})
  }

  async logout(){
    const userLogout = await signOut(this.auth)
    return userLogout
  }
}

const firebase = new Firebase()

export default firebase;