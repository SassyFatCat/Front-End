import React, { useState, useEffect, useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import {StyledHeader} from "./FormStyles";
import {axiosWithAuth} from '../../utils/axiosWithAuth';
import { date } from "yup";

const initialForm = {
  name: "",
  id: 0,
  tags: {
    school: false,
    exercise: false,
    work: false,
  },
  completed: false,
  dueDate: {
    month: '',
    day: ''
  },
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

const dateChange = event => {
  const {name, value} = event.target;
  setFormData({
    ...formData,
    dueDate: {
      ...formData.dueDate,
      [name]: value
    }
  })
}

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
    
        todoItem.tags.forEach(tag => checkboxTags[tag] = true);
        todoItem.tags = checkboxTags;
        setFormData(todoItem);
        })
        .catch(err => console.log(err))
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
                <label>Due date: </label>
                <select onChange={dateChange} name='month'>
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>


                <select onChange={dateChange} name='day'>
                  <option value="">Day</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                  <option value='13'>13</option>
                  <option value='14'>14</option>
                  <option value='15'>15</option>
                  <option value='16'>16</option>
                  <option value='17'>17</option>
                  <option value='18'>18</option>
                  <option value='19'>19</option>
                  <option value='20'>20</option>
                  <option value='21'>21</option>
                  <option value='22'>22</option>
                  <option value='23'>23</option>
                  <option value='24'>24</option>
                  <option value='25'>25</option>
                  <option value='26'>26</option>
                  <option value='27'>27</option>
                  <option value='28'>28</option>
                  <option value='29'>29</option>
                  <option value='30'>30</option>
                  <option value='31'>31</option>

                </select><br />

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
