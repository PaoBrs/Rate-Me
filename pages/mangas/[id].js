import React, {useEffect, useContext, useState} from 'react'
import { useRouter } from 'next/router';
import Error404 from '../../components/layouts/404';
import Layout from '../../components/layouts/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Spinner from '../../components/layouts/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromBracket, faArrowUpRightFromSquare, faComments,faComment } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../../components/ui/StarRating';
import { doc, updateDoc,deleteDoc, getFirestore, collection } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage';

import {FirebaseContext} from '../../firebase';
import { onSnapshot } from 'firebase/firestore';
import  formatDistanceToNow  from 'date-fns/formatDistanceToNow';
import { Container, InputSubmit } from '../../components/ui/Form'
import { app } from 'firebase/app';

const MangaContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    content: center;
    padding-top: 10rem;
    padding-bottom: 2rem;
  }
`

const Title = styled.h2`
  color: var(--white);
    font-weight: 700;
    font-family: 'PT Sans', sans-serif;
    font-size: 3rem;
    padding-top: 2rem;
`
const Manga =() => {

  const [manga, setManga] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});

  const router = useRouter();
  const  {id} = router.query;

  const {firebase, user} = useContext(FirebaseContext);


  const db = getFirestore(); 
  
  const { name, author, description, image, comments, url, createdAt, URLImage, votes, rateMe, voted, creator} = manga;

// const {email, uid}= creator; 

  console.log('holiiiiiiii')
  console.log(creator)
  // console.log(email)
  // console.log(uid)
  // console.log(creator.uid)

  useEffect(() => {
    if (id) {
      const getManga = async () => {
        onSnapshot(collection(db, 'mangas'), (snapshot) => {
          const manga = snapshot.docs.find(doc => doc.id === id);
          if (manga) {
            setManga(manga.data());
          } else {
            setError(true);
          }
          // setManga(snapshot.docs.find(doc => doc.id === id)[0].data());
        })
      }
      getManga();
    }
  }, [id])

  if (Object.keys(manga).length === 0 && !error) return ( <Spinner />)

const commentChange = e => {
  setComment({
    ...comment,
    [e.target.name]: e.target.value
  })
}

const addComment = e => {
  e.preventDefault();

  if (!user) {
    return router.push('/login');
  }

  comment.userId = user.uid;
  comment.userEmail = user.email;

  const newComment = [...comments, comment];

  const docRef = doc(db, 'mangas', `${id}`);

  updateDoc (docRef, {
    comments: newComment,

  })

  setManga({
    ...manga,
    comments:newComment
  })
}

const allowedToErase =()=>{
  if (!user) {
    return false;
  }
  if (creator.uid === user.uid) {
    return true;
  }
}

const handleDelete = async () => {
  if (!user) {
    return router.push('/login');
  }
  if (creator.uid !== user.uid) {
    return router.push('/');
  }
  const storage = getStorage(app);
  // const deleteRef = ref(storage, `${patchimagen}`);
  try {
    await deleteDoc(doc(db, "mangas", `${id}`))
    await deleteObject(deleteRef)
    router.push('/')
  } catch (error) {
    console.log(error);
  }
    
  }


  return (
    
    <Layout className ='relative' >
      <>
      {error ? <Error404 /> : (
      <div>
      <MangaContainer>
        <div className='flex flex-col justify-center items-center'> 

        <img src={URLImage} alt={manga.name} className='h-400px w-550px' />
        
        <div>
        {allowedToErase() && (
        
        <button 
        onClick={handleDelete}
        css={css`
        border: solid 1px var(--white);
        justify-content: center;
        margin-top: 3rem;
        transition: all .3s;
        color: var(--white);
        font-size: 1.8rem;
        text-transform: uppercase;
        font-family: 'PT Sans', sans-serif;
        font-weight: 700;
        width: 100%;
        padding: 1.5rem;
        text-align: center;

        &:hover{
          cursor: pointer;
          background-color: var(--red);
          border: none;
        }
        `}
        > Delete </button>
        
          )}
  </div>
        </div>
        <div className=' w-3/4'>
<div className='flex flex-row place-content-between mt-20 text-white'>
        <h1 
          css={css`
          color: var(--white);
          font-weight: 700;
          font-family: 'PT Sans', sans-serif;
          font-size: 5rem;
          `}
        >{name}</h1>
        <p className='text-white'>Published {formatDistanceToNow( new Date (createdAt))} ago</p>
        </div>
        <p className='text-white text-xl pb-10'> By: {author}</p>
        <p className='text-white text-justify'>{description}</p>
        {user && (
          <>
          <Title>Rate Me</Title>
          <StarRating 
          votes={votes}
          user = {user}
          rateMe = {rateMe}
          voted = {voted}
          manga={manga}
          />
          </>
        )}
        </div>

      </MangaContainer>
      {user && (
  <> 
      <Title className=' mt-2 pl-72'><FontAwesomeIcon icon={faComment} />Leave a comment </Title>
      <form
      onSubmit={addComment}
      >
      <Container>
    <div className="relative z-0 w-1/2  mb-6 group flex m-auto">
      <input
      type="text"
      name='message'
      onChange={commentChange}
      className="block py-3.5 px-0 m-2 w-full text-3xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-orange-400 peer" placeholder=" " required />
      <label htmlFor="" className="peer-focus:font-medium absolute text-4xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Comment</label>
      </div> 
    <InputSubmit type="submit" value="Send" className=' w-1/2'/>
    </Container>
      </form>
  </>
      )}
      <Title className=' mt-8 pl-72 pb-9'><FontAwesomeIcon icon={faComments} />  Comments</Title>
      {(comments.length === 0) ? (<p className='text-white pl-72 pb-11'>No comments yet</p>) : (
<div>
      {comments.map((comment, i) => (
          <>
          <div key={comment.id} 
          css={css`
          border: 1px solid var(--white);
          padding: 2rem;
          margin-bottom: 2rem;
          width: 50%;
          margin-left: auto;
          margin-right: auto;

          `
          }>
            <p className='text-white'>By
              <span 
              css={css`
              color: var(--white);
              font-weight: 700;
              font-family: 'PT Sans', sans-serif;
              padding-left: 1rem;
              `}
              >
              {comment.userEmail}
              </span>
              </p>
            <p
            css={css`
            color: var(--white);
            font-size: 2rem;
            font-family: 'PT Sans', sans-serif;
            `}
            >{comment.message}</p>
          </div> 
          </>

        ))}

        </div>


      )}

      
      </div>

      

      )}
      </>

<div className='h-20 w-64 fixed bottom-8 right-8 text-white bg-orange-500 text-center rounded-md flex justify-center items-center shadow-md shadow-gray-600 hover:bg-red-400'> 
<a href={url} target='_blank' rel='noreferrer'><FontAwesomeIcon icon={faArrowUpRightFromSquare} className='fa-fade' />  Want to read?</a>
</div>

  

    </Layout>
  )

}

export default Manga; 