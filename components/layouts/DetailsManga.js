import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar , faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const Image = styled.img`
width: 200px;
height: 300px;
`
const Container = styled.div`
background-color: #2F3034;
height: 430px;
`


const DetailsManga = ({manga}) => {

  const {id, name, author, description, image, comments, url, createdAt, URLImage, votes} = manga;

  return (
    <div>
      <Container>
        <div>
          <Image src={URLImage} alt={name} />
        </div>
        <div className='flex flex-row place-content-between p-5'>
        <h1>{name}</h1>
        <p><FontAwesomeIcon icon={faStar } /> {votes}</p>
        </div>
        <div className='p-4'>
        <p>{author}</p>
          <div className='flex flex-row place-content-between'>
        <p className='text-orange-400'>see more</p>
        <p><FontAwesomeIcon icon={faEllipsisV } /></p>
        </div>
        </div>
      </Container>
    </div>
  )
}

export default DetailsManga;
