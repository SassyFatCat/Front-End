import React, { useState, useEffect, useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { dummyData } from "../Dashboard/dummyData";
import {StyledHeader} from "./FormStyles";
import {axiosWithAuth} from '../../utils/axiosWithAuth';

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

// define a separate onChange for checkboxes, setting a new local state (isChecked), takes in tag name and isChecked boolean
// const onCheckboxChange = (name, isChecked) => {
//  setFormData({
//   ...formData, 
//   tags: {
//     ...formData.tags, 
//     [name]: isChecked, 
//   }
// })
//}
// then below in the onSubmit we shouldn't need to specify the strict equals for true, as isChecked will only return truthy?


const submit = event => {
event.preventDefault();
let newTodo = {...formData};
newTodo.tags = Object.keys(formData.tags).filter(tag => formData.tags[tag] === true)


if (todosContext.addEdit.is === 'add') {
    axiosWithAuth.post('/todos', newTodo)
      .then(res => todosContext.causeRerender())
      .catch(err => console.log(err))
    
}
else {
    axiosWithAuth  
      .put(`/todos/${todosContext.addEdit.id}`, newTodo)
      .then(res => todosContext.causeRerender())
      .catch(err => console.log(err))
}
// newTodo is ready for .put() or .post()
}

useEffect(() => {
if (todosContext.addEdit.is === 'edit') {
    axiosWithAuth
      .get(`/todos/${todosContext.addEdit.id}`)
        .then(res => {
          const todoItem = res.data;
          let checkboxTags = {
            school: false,
            exercise: false,
            work: false
        };
    
        todoItem.tags.forEach(tag => checkboxTags[tag] = true);{/* comment */}
        todoItem.tags = checkboxTags;{/* comment */}
        setFormData(todoItem);{/* comment */}
        })
        .catch(err => console.log(err))
    // Populate the form with the success data
}
}, [todosContext.addEdit.id])
    return (
        <div>
            <StyledHeader>{todosContext.addEdit.is === 'add' ? ('Add a new todo') : ('Edit your todo')}</StyledHeader>


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
