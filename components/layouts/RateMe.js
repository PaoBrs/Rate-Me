import React from 'react'
import styled from '@emotion/styled'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
font-family: 'Roboto', sans-serif;
display: grid;
place-items: center;
margin-top: 5rem;
`

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.06rem;
  margin: 0 0 16px;
`
const Span = styled.span`
  color: #fff;
  font-size: 100px;
  
`



const RateMe = () => {

  return (
    <Container>
    <Title>
    <FontAwesomeIcon icon={faStar} className='text-orange-500  fa-2x fa-flip'/>
      <Span>Rate Me</Span>
    </Title>
    </Container>
  )
}

export default RateMe;
