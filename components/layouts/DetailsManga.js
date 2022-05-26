import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar , faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Image = styled.img`
width: 200px;
height: 300px;
`
const Container = styled.div`
background-color: #2F3034;
height: 440px;

//  &:hover{
//   background-color: #2F3034;
//   height: 450px;
// }
`

const Title = styled.h1`
font-weight: 700;
font-family: 'PT Sans', sans-serif;
`
const RouterLink = styled.a`
color: var(--orange);
cursor: pointer;

  &:hover{
    color: var(--purple);
  }
`


const DetailsManga = ({manga}) => {

  const {id, name, author, description, image, comments, url, createdAt, URLImage, votes, rateMe} = manga;

  return (
    <div>
      <Container className='mb-2'>
        <div>
          <Image src={URLImage} alt={name} />
        </div>
        <div className='flex flex-row place-content-between p-5'>
        <Title className='w-52'>{name}</Title>
        <p><FontAwesomeIcon icon={faStar } /> {rateMe}</p>
        </div>
        <div className='p-4'>
        <p>{author}</p>
          <div className='flex flex-row place-content-between'>
            <Link href='/mangas/[id]' as={`/mangas/${id}`}>
        <RouterLink>see more</RouterLink>
        </Link>
        <p><FontAwesomeIcon icon={faEllipsisV } /></p>
        </div>
        </div>
      </Container>
    </div>
  )
}

export default DetailsManga;
