import React from 'react'
import styled from '@emotion/styled';

export const Form = styled.form`
max-width: 600px;
width: 95%;
margin: 5rem auto 0 auto;

fieldset {
  margin: 2rem 0;
  border: none;
  font-size: 3rem;
  padding: 2rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  color: #fff;
  

`;

export const Container = styled.div`
display: flex;
flex-direction: column;
padding: 25px;
position: relative;
`;

export const InputSubmit = styled.input`
border: solid 1px var(--white);
width: 92%;
padding: 1.5rem;
text-align: center;
color: var(--white);
font-size: 1.8rem;
text-transform: uppercase;
font-family: 'PT Sans', sans-serif;
font-weight: 700;
display: flex;
margin:auto;
justify-content: center;
margin-top: 3rem;
transition: all .3s;

&:hover{
  cursor: pointer;
  background-color: var(--red);
  border: none;
}

`;

export const Message = styled.p`
color: var(--white);
font-size: 1.8rem;
text-align: left;
font-family: 'PT Sans', sans-serif;
font-weight: 700;
margin-top: 3rem;


`;

export const Error = styled.p`
background-color: #E8505B;
padding: 1rem;
font-family: 'PT Sans', sans-serif;
font-weight: 700;
font-size: 1.4rem;
color: var(--black);
text-align: center;
text-transform: uppercase;
margin: 2rem 0;
width: 92%;
margin: auto;
`;