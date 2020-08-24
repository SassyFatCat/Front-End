import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext';

const TodoList = () => {
    const todosContext = useContext(TodosContext); 
    
    return (
        <div>
            {todosContext.todos.map(item => {
                return (
                    <div>
                        <h3>{item.task}</h3>
                        <button>Delete</button>
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
