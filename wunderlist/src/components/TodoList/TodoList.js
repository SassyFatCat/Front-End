import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext';

import {Button, Tags, TodoTitle, TodoDiv} from './TodolistStyled';

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
                    <TodoDiv>
                        <TodoTitle>{item.name}</TodoTitle>
                        <Button>Delete</Button>
                        <Button onClick={event => {
                            event.preventDefault();
                            editTodo(item.id)
                        }}>Edit</Button>
                        {item.tags.map(tag => {
                            return (
                                <Tags>
                                    {tag}
                                </Tags>
                            )
                        })}
                    </TodoDiv>
                )
            })}
        </div>
    )
}

export default TodoList; 
