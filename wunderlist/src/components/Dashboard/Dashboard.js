// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';

//DUMMY DATA
import {dummyData} from './dummyData';
import TodoList from '../TodoList/TodoList'; 

// COMPONENTS
import AddEditForm from '../AddEditForm/AddEditForm';

const Dashboard = () => {
const [todos, setTodos] = useState(dummyData);
const [update, setUpdate] = useState(true);
const [addEdit, setAddEdit] = useState({
    is: false,
    id: 0
}); // is 'add' opens add form, 'edit' opens edit form, false will not mount form

const getTodos = () => {
    // perform an axiosWithAuth().get to get the todos
    return null
};

const logOut = event => {
    event.preventDefault();
    // clear authentication token from localStorage or state
    // route the user to /Login
}

useEffect(() => {
    getTodos()
}, [update]) //Dependency array will watch for changes in slice of state that changes when .put() or .delete() or adding new task

    return (
        <div>
            <div>
                <h1>Wunderlist</h1>
                <button onClick={logOut}>Log Out</button>
            </div>

            <TodosContext.Provider value={{todos, setUpdate, addEdit, setAddEdit}}>
                <TodoList />
                {addEdit.is ? <AddEditForm /> : null}
            </TodosContext.Provider>
            
        </div>
    )
}

export default Dashboard