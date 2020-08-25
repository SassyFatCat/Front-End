import React, { useState, useEffect, useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { dummyData } from "../Dashboard/dummyData";

const initialForm = {
  name: "",
  id: 0,
  tags: {
    school: false,
    exercise: false,
    work: false,
  },
  completed: false,
  dueDate: null,
};

const AddEditForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const todosContext = useContext(TodosContext);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


const onCheckboxChange = event => {
const {name, checked} = event.target;
setFormData({
    ...formData,
    tags: {
        ...formData.tags,
        [name]: checked
    }
})
}

const submit = event => {
event.preventDefault();
let newTodo = {...formData, tags: formData.tags};
newTodo.tags = Object.keys(formData.tags).filter(tag => formData.tags[tag] === true)

if (todosContext.addEdit.is === 'add') {
    //.post()
    todosContext.setUpdate(!todosContext.update)
}
else {
    //.put()
    todosContext.setUpdate(!todosContext.update)
}
// newTodo is ready for .put() or .post()
}

useEffect(() => {
if (todosContext.addEdit.is === 'edit') {
    // make a axiosWithAuth().get, getting the todo task with the id in todosContext.addEdit.id
    // Populate the form with the success data

    const todoItem = {...dummyData.find(item => item.id === todosContext.addEdit.id)};{/* comment */}
    let checkboxTags = {
        school: false,
        exercise: false,
        work: false
    };

    todoItem.tags.forEach(tag => checkboxTags[tag] = true);{/* comment */}
    todoItem.tags = checkboxTags;{/* comment */}
    setFormData(todoItem);{/* comment */}
    // console.log(todosContext.todos)

}
}, [todosContext.addEdit.id])
    return (
        <div>
            <h1>{todosContext.addEdit.is === 'add' ? ('Add a new todo') : ('Edit your todo')}</h1>


      <form>
        <label>Task: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
        />


                <label>School
                <input 
                    type='checkbox'
                    name='school'
                    value='school'
                    checked={formData.tags.school}
                    onChange={onCheckboxChange}
                /></label>

                <label>Work
                <input
                    type='checkbox'
                    name='work'
                    value='work'
                    checked={formData.tags.work}
                    onChange={onCheckboxChange}
                 /></label> 

                <label>Exercise       
                <input 
                    type='checkbox'
                    name='exercise'
                    value='exercise'
                    checked={formData.tags.exercise}
                    onChange={onCheckboxChange}
                /></label> 
                <button onClick={submit}>{todosContext.addEdit.is === 'add' ? ('Submit') : ('Submit changes')}</button>
                <button onClick={event => {
                  event.preventDefault();
                  todosContext.setAddEdit(false);
                }}>Cancel</button>
            </form>
        </div>
    )

};

export default AddEditForm;
