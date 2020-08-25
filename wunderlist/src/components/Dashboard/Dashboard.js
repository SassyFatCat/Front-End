// LIBRARIES, UTILITIES, CSS
import React, {useState, useEffect} from 'react';
import {TodosContext} from '../../context/TodosContext';

//DUMMY DATA
import {dummyData} from './dummyData';
import TodoList from '../TodoList/TodoList'; 
import './Dashboard.css'; 

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

useEffect(() => {
    getTodos()
}, [update]) //Dependency array will watch for changes in slice of state that changes when .put() or .delete() or adding new task

    return (
        <div>
            <div className="dash-bar">
                <h1>Wunderlist</h1>
                <button className="logout-button" onClick={logOut}>Log Out</button>
            </div>


            <TodosContext.Provider value={{todos, setUpdate, addEdit, setAddEdit}}> {/* comment */}
                <TodoList />
                {addEdit.is ? <AddEditForm /> : null}{/* comment */}

            </TodosContext.Provider>
            
        </div>
    )
}

export default Dashboard