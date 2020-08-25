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
font-family: 'Lato', sans-serif; 
font-size: 2.5rem;
margin-bottom: 1.5%;
padding: 0; 
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column; 
`

const ListHeader = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    width: 70%;
`

const SearchForm = styled.form`
    width: 30%;
    margin: auto; 
    display: flex;
    border: 1px solid red;
    padding: 2% 2% 1% 2%;
    &:first-child{
        font-size: 1.2rem;
        font-family: 'Lato', sans-serif;
    }
`

export {Header, LogoutButton, DashBar, TodoListContainer, TodoHeader, FormDiv, ListHeader, SearchForm}