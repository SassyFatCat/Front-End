import styled from 'styled-components';

const Header = styled.h1` 
    color: whitesmoke; 
    font-size: 3rem;
    text-align: center;
    width: 92%;
    font-family: 'Lato', sans-serif;
`

const LogoutButton = styled.button`
    height: 5vh;
    justify-self: flex-end;
`

const DashBar = styled.div` 
    background-color: #88B04B;
    display: flex;
    align-items: center;
    width: 100vw;
    margin-bottom: 2%;
`

export {Header, LogoutButton, DashBar}