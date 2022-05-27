import styled from '@emotion/styled'

const Button = styled.a`
font-weight: 700;
text-transform: uppercase;
border: 1px;
padding: 1rem 2rem;
margin-right: 1rem;
transition: all .3s;
background-color: ${props => props.bgColor? '#FF9F45' : 'white'};
color: ${props => props.bgColor? 'white' : '#000'};

&:last-of-type{
  margin-right: 0;
}

&:hover{
  cursor: pointer;
  background: #F4BC8A;
  color: white;
}

`
export default Button