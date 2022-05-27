import React, {useState, useContext} from 'react';
import Router, {useRouter} from 'next/router';
import Layout from '../components/layouts/Layout'
import styles from '@emotion/styled'
import {Form, InputSubmit, Container, Error} from '../components/ui/Form'
import Error404 from '../components/layouts/404'


import { FirebaseContext } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

import useValidation from '../hooks/useValidation';
import validateAddManga from '../validation/validateAddManga';

const INITIAL_STATE={
  name: '',
  author: '',
  url: '',
  description: ''
}

const Heading = styles.h1`
  font-size: 4rem;
  text-align: center;
  color: #ffffff;
  margin-top: 13rem;
`

export default function NewManga() {

  const [errorUser, setErrorUser] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [URLImage, setURLImage] = useState('');

  const [patchimagen, guardarPatchImagen] = useState('');

  const {value, error, handleChange, handleSubmit, handleBlur} = useValidation(INITIAL_STATE, validateAddManga, addManga )

  const {name, author, url, description} = value;

  const router = useRouter();

  const {user, firebase} = useContext(FirebaseContext);

  const {db} = firebase

const handleImageUpload = e => {
        // Se obtiene referencia de la ubicación donde se guardará la imagen
        const file = e.target.files[0];
        const imageRef = ref(firebase.storage, 'mangas/' + file.name);

        // Se inicia la subida
        setUploading(true);
        const uploadTask = uploadBytesResumable(imageRef, file);

        // Registra eventos para cuando detecte un cambio en el estado de la subida
        uploadTask.on('state_changed', 
            // Muestra progreso de la subida
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is: ${progress}% done`);

                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
            },
            // En caso de error
            error => {
                setUploading(false);
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                  // ...
            
                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            },
            // Subida finalizada correctamente
            () => {
                setUploading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log('File available at:', url);
                    setURLImage(url);
                });
            }
        );
        
    // uploadBytesResumable(imageRef, archivo, )
    // .then((snapshot) => {
    //   guardarPatchImagen(snapshot.metadata.fullPath);
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       guardarUrlImagen(url)
    //   });
    // }).catch((error) => {
    //   console.error('Upload failed', error);
    // });
    };



async function addManga(){

  if (!user){
    return router.push('/login');
  }

  const manga = {
    name,
    author,
    url,
    URLImage,
    description,
    votes: [],
    rateMe: 0,
    comments : [],
    createdAt: Date.now(),
    // genre: [],
    creator: {
      uid: user.uid,
      email: user.email,
      // role: user.role
    },
    voted:[],
  }

  const mangas = await addDoc(collection(db, "mangas"), (manga));

}

  return (
  <div>
    <Layout>
      { !user ? <Error404 /> : (
        <>
        <Heading>New Manga</Heading>



        <Form 
        onSubmit={handleSubmit}
        noValidate
        >
    
          <fieldset>
            <legend>General info</legend>
    
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
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
          <label htmlFor="author" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
      </div>
        </Container>
    {error.author && <Error>{error.author}</Error>}
    
    <Container>
        <div className="relative z-0 w-full mb-6 group">
          <input 
          accept="image/*"
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
          <label htmlFor="image" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
      </div>
        </Container>
    {error.image && <Error>{error.image}</Error>}
    
    <Container>
        <div className="relative z-0 w-full mb-6 group">
          <input 
          type="url"
          id="url"
          name="url"
          value={url}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
          <label htmlFor="url" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Url</label>
      </div>
        </Container>
    {error.url && <Error>{error.url}</Error>}

    {/* <Container>
    <label htmlFor="genre" className="sr-only">Underline select</label>
    <select id="genre" className="block py-2.5 px-0 w-full text-4xl text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option selected>Choose a genre</option>
    <option value="comedy">Comedy</option>
    <option value="romance">Romance</option>
    <option value="sports">Sports</option>
    <option value="adventure">Adventure</option>
</select>
    </Container> */}

    
    </fieldset>
    <fieldset>
    <legend>About this Manga</legend>
    <Container>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
          <label htmlFor="description" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
      </div>
        </Container>
    {error.description && <Error>{error.description}</Error>}
    </fieldset>
    
    {errorUser && <Error>{errorUser}</Error>}
    
          <InputSubmit
            type="submit"
            value="Create Manga"
          />
    
    
          </Form>
          </>
      ) }
      
      </Layout>
  </div>
  )
}
