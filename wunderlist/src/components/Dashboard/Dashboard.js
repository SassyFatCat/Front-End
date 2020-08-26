// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';
import {Header, LogoutButton, DashBar, TodoListContainer, TodoHeader, FormDiv, ListHeader, SearchForm} from './DashboardStyled';
import {useHistory} from 'react-router-dom';

// COMPONENTS
import AddEditForm from '../AddEditForm/AddEditForm'
import TodoList from '../TodoList/TodoList';
import useFetch from '../../utils/useFetch';
import {axiosWithAuth} from '../../utils/axiosWithAuth'

const Dashboard = () => {
const history = useHistory();
const {response, error, isLoading, causeRerender, update} = useFetch({
    api: axiosWithAuth,
    method: 'get',
    url: '/todos'
});
const [searchResults, setSearchResults] = useState(response);
const [searchTerm, setSearchTerm] = useState('');
// const [update, setUpdate] = useState(true);
const [addEdit, setAddEdit] = useState({
    is: false, 
    id: 0
}); 

// const getTodos = () => {
//     // perform an axiosWithAuth().get to get the todos\

//     return null
// };

const logOut = event => {
    event.preventDefault();
    localStorage.removeItem('token')
    history.push('/login');
}

const addTodo = event => {
event.preventDefault();
setAddEdit({
    is: 'add'
})
};

const filterTodos = searchTerm => {
setSearchResults(response.filter(todo => searchTerm.test(todo.name)));
}

useEffect(() => {
    setSearchResults(response)
}, [response, error, isLoading, update]) //Dependency array will watch for changes in slice of state that changes when .put() or .delete() or adding new task

    return (
        <div>
            <DashBar>
                <Header>Wunderlist</Header>
                <LogoutButton onClick={logOut}>Log Out</LogoutButton>
            </DashBar>

            <div>
                <SearchForm>
                    <label htmlFor="search">Search</label>
                    <input
                    type="text"
                    name="search"
                    onChange={event => {
                        const {value} = event.target;
                        setSearchTerm(value);
                        const term = new RegExp(`${value}`, 'i')
                        filterTodos(term)
                    }}
                    value={searchTerm}
                    />
                </SearchForm>
            </div>

            <TodosContext.Provider value={{response, addEdit, setAddEdit, searchResults, causeRerender}}>
            <TodoListContainer>
                <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center'}}>
                    <ListHeader>
                        <TodoHeader>My To-do List</TodoHeader>
                        {!addEdit.is && <LogoutButton onClick={addTodo}>Add Todo</LogoutButton>}
                    </ListHeader>
                    <TodoList />
                </div>
                <FormDiv>
                {addEdit.is ? <AddEditForm /> : null}
                </FormDiv>
            </TodoListContainer>
            </TodosContext.Provider>
            
        </div>
    )
}

export default Dashboard