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
    margin-left: 3%;
`

const DashBar = styled.div` 
    background-color: #88B04B;
    display: flex;
    align-items: center;
    width: 100vw;
    margin-bottom: 2%;
`

const TodoListContainer = styled.div`
display: flex;
width: 90%;
margin: 2%;
justify-content: center;
`;

const TodoHeader = styled.h1`
text-align: left;
text-decoration: underline;
margin-bottom: 1.5%;
`;

export {Header, LogoutButton, DashBar, TodoListContainer, TodoHeader}