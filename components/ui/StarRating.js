import React, {useState, useContext,} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import {FirebaseContext} from '../../firebase';
import { doc, updateDoc, getFirestore, collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore';

const StarRating = (manga) => {

const [rating, setRating] = useState(null);
const [hover, setHover] = useState(null);
const [saveManga, setSaveManga] = useState({});

const router = useRouter();
const  {id} = router.query;

const {firebase, user} = useContext(FirebaseContext);

const {db} = firebase

const {votes, rateMe} = manga;



const stars = [...Array(5)];

const handleClick = (num) => {
  
  if (!user){
    return router.push('/login');
  }

    const newTotal = manga.votes.reduce((total, vote) => total + vote, 0)
    const prom = (((newTotal + num) / (manga.votes.length + 1))).toFixed(1);
  if (manga.voted.includes(user.uid))return;

  const haveVoted = [ ...manga.voted, user.uid];

  const docRef = doc(db, 'mangas', `${id}`);
  const newVotes = [...votes, num];

  updateDoc (docRef, {
    votes: newVotes,
    rateMe: prom,
    voted: haveVoted
  })

  setSaveManga({
    ...manga,
    votes: [...manga.votes, num],
    rateMe: prom
})

      
    }



  return (
<>
    <div className='flex flex-row flex-wrap gap-4'>
    { stars.map((star, i) => (

      <label key ={i}>
        <input type="radio" name="rating" value={i+1} onClick={() => handleClick(i+1)} 
        css={css`
        display: none;
        `}
        />
      <FontAwesomeIcon key ={star} icon={faStar} color={ (i+1)<= (hover || rating) ? '#F8B400' : '#EFEFEF' } className='fa-2x cursor-pointer'
      onMouseEnter={() => setHover(i+1)} 
      onMouseLeave={() => setHover(null)}
      />
      </label>

    ))}
</div>
<p className='text-white'>rate : {rateMe}</p>
</>
  )
}

export default StarRating;