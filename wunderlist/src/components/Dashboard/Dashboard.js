// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';
import {Header, LogoutButton, DashBar, TodoListContainer, TodoHeader, FormDiv, ListHeader, SearchForm} from './DashboardStyled';

//DUMMY DATA
import {dummyData} from './dummyData';
import TodoList from '../TodoList/TodoList'; 


// COMPONENTS
import AddEditForm from '../AddEditForm/AddEditForm'

const Dashboard = () => {
const [todos, setTodos] = useState(dummyData);
const [searchResults, setSearchResults] = useState(todos);
const [searchTerm, setSearchTerm] = useState('');
const [update, setUpdate] = useState(true);
const [addEdit, setAddEdit] = useState({
    is: false, 
    id: 0
}); 

const getTodos = () => {
    // perform an axiosWithAuth().get to get the todos
    return null
};

const logOut = event => {
    event.preventDefault();
    // clear authentication token from localStorage or state
    // route the user to /Login
}

const addTodo = event => {
event.preventDefault();
setAddEdit({
    is: 'add'
})
};

const filterTodos = searchTerm => {
setSearchResults(todos.filter(todo => searchTerm.test(todo.name)));
}

useEffect(() => {
    getTodos()
}, [update]) //Dependency array will watch for changes in slice of state that changes when .put() or .delete() or adding new task

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

            <TodosContext.Provider value={{todos, update, setUpdate, addEdit, setAddEdit, searchResults}}>
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