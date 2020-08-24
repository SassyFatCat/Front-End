// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';

//DUMMY DATA
import {dummyData} from './dummyData';
import TodoList from '../TodoList/TodoList'; 

const Dashboard = () => {
const [todos, setTodos] = useState(dummyData);
const [update, setUpdate] = useState(true);

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

            <TodosContext.Provider value={{todos, setUpdate}}>
                <TodoList /> 
            </TodosContext.Provider>
            
        </div>
    )
}

export default Dashboard