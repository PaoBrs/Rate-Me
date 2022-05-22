import React from 'react'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from '@emotion/react';

const Error404 = () => {
  return (
    <div className='flex flex-col justify-center text-center mt-80'>
      <FontAwesomeIcon icon={faCircleExclamation} className='text-orange-500  fa-10x  fa-beat-fade'/>
      <h1
      css = {css`
        color: var(--orange);
        font-size: 7rem;
        font-weight: 700;
      `}
      >Error 404</h1>
      <p
      css = {css`
        color: var(--white);
        font-size: 3rem;
        font-weight: 700;
        font-family: 'Roboto', sans-serif;
      `}
      >Not an existing Manga</p>
    </div>
  )
}

export default Error404;