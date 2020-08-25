import React, {useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import './Login.css'

const initialValues={
    username: '',
    password: '',
}

const Login = () => {
const [userInfo, setUserInfo] = useState([])
const [values, setValues] = useState(initialValues)

const thisUrl = 'https://reqres.in/api/users'

const update = (name, value) => {
    const updateUser = {[name]: value, ...values}
    setValues(updateUser)
  
}

const onChange = event => {
    const {name, value} = event.target
    update(name, value)
}

const getUser = () => {
    axios.get(thisUrl)
    .then(res => {
        setUserInfo(res.data)
    })
    .catch(error => {
        console.log('check axios get')
    })

    .finally(() => {
        setValues(initialValues)
    })
}

const postUser = thisUser => {
   
    axios.post('https://reqres.in/api/users', thisUser)
    .then(res => {
        setUserInfo([...userInfo, res.data])
    
    })
    .catch(error => {
      console.log('check axios post')
    })
   
  }



const submit = () => {
    const thisUser ={
    username: values.username.trim(),
    password: values.password
}
postUser(thisUser)
}


const onSubmit = event => {
    event.preventDefault()
    submit()
}

useEffect(() => {
    getUser()
  }, [])

    return(
        <>
        <div className = 'login'></div>
        <form className='loginContainer' onSubmit={onSubmit}>
        <h2>Login Here</h2>
        <div className='loginInfo'>
            <label>Username: 
                <input
                //  value={values.username}
                 onChange={onChange}
                name='username'
                type='text'
                placeholder='type your username here'
                />
            </label>
            <label>Password: 
                <input
                //  value={values.password}
                 onChange={onChange}
                name='password'
                type='text'
                placeholder='type your password here'
                />
            </label>
            <button type='submit' onSubmit={onSubmit}>submit</button>
        </div>
        <Link to='/' className='homeLink'>Home</Link>
        </form>
        
        </>
    )

}
export default Login