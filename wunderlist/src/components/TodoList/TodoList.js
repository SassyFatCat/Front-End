import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext';
import {axiosWithAuth} from '../../utils/axiosWithAuth'

import {Button, Tags, TodoTitle, TodoDiv, CompletedTodoTitle, Container} from './TodolistStyled';

const TodoList = () => {
const todosContext = useContext(TodosContext); 
    
const editTodo = id => {
    todosContext.setAddEdit({
        is: 'edit',
        id: id
    })
}

const handleDelete = (id) => {
    axiosWithAuth.delete(`/todos/${id}`)  
    .then(res => {
        console.log(res);
        todosContext.causeRerender()
    })
    .catch(err => console.log(err));
    
    
}

const handleCompleted = item => {
    const newItem = {...item, completed: true}
    axiosWithAuth.put(`/todos/${item.id}`, newItem)
    .then(res => todosContext.causeRerender())
    .catch(err => console.log('error'))
}

    return (
        <Container>
            
            {todosContext.searchResults.map(item => {// NEEDS TO BE RESPONSE.DATA?
                return (
                    <TodoDiv>
                        {item.completed ? <CompletedTodoTitle>{item.name}</CompletedTodoTitle> : <TodoTitle>{item.name}</TodoTitle>}
                        <Button onClick={event => { 
                            event.preventDefault();
                            handleDelete(item.id)}}>Delete</Button>

                        <Button onClick={event => {
                            event.preventDefault();
                            editTodo(item.id)
                        }}>Edit</Button>

                        <Button onClick={event => { 
                            event.preventDefault(); 
                            handleCompleted(item)}} disabled={item.completed}>Completed</Button>
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
        </Container>
    )
}

export default TodoList; 
