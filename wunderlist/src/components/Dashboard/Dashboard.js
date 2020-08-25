// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';
import {Header, LogoutButton, DashBar} from './DashboardStyled';

//DUMMY DATA
import {dummyData} from './dummyData';
import TodoList from '../TodoList/TodoList'; 


// COMPONENTS
import AddEditForm from '../AddEditForm/AddEditForm'

const Dashboard = () => {
const [todos, setTodos] = useState(dummyData);
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
                <form>
                    <label htmlFor="search">Search</label>
                    <input
                    type="text"
                    name="search"
                    />
                </form>
            </div>

            <TodosContext.Provider value={{todos, update, setUpdate, addEdit, setAddEdit}}> {/* comment */}
                <TodoList />
                <LogoutButton onClick={addTodo}>Add Todo</LogoutButton>
                {addEdit.is ? <AddEditForm /> : null}{/* comment */}

            </TodosContext.Provider>
            
        </div>
    )
}

export default Dashboard