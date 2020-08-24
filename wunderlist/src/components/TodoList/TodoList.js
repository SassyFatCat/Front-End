import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext';

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
                    <div>
                        <h3>{item.name}</h3>
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
