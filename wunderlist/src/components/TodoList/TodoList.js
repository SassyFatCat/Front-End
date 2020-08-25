import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext';

import './Todolist.css'; 

const TodoList = () => {
const todosContext = useContext(TodosContext); 
    
const editTodo = id => {
    todosContext.setAddEdit({
        is: 'edit',
        id: id
    })
}

    return (
        <div>
            {todosContext.todos.map(item => {
                return (
                    <div className="tasks">
                        <h2>{item.name}</h2>
                        <button>Delete</button>
                        <button onClick={event => {
                            event.preventDefault();
                            editTodo(item.id)
                        }}>Edit</button>
                        {item.tags.map(tag => {
                            return (
                                <span>
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList; 
