import styled from 'styled-components'
const TodoDiv = styled.div`
    background: whitesmoke;
    height: 69px;
    width: 30%;
    margin-left: 10%;
    display: block;
    border-bottom: 1px solid #2C3E50;
    color: black;
    text-transform: capitalize;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-indent: 20px;
    cursor: pointer;
    transition: all 0.7s ease;
    padding: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    transition: 0.5s background-color; 
    &:hover {
      background-color: white; 
    }
  `



const TodoTitle = styled.h2`
      font-size: 1.2rem;
  `

const Tags = styled.span`
    display: flex;
    float: right;
    font-size: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 0.5rem;
    text-transform: capitalize;
    font-weight: normal;
    color: black;
  `

const Button = styled.button`
    float: left;
    color: white;
    background-color: #88B04B;
    font-family: 'Lato', sans-serif;
    border:0.1em solid #000000;
    margin:0 0.2em 0.2em 0;
    border-radius:0.12em;
    &:hover {
      color: black;
      border-color:#FFFFFF;
  }
`

export {Button, Tags, TodoTitle, TodoDiv}

