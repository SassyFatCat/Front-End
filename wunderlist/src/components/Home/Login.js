import React, {useState} from 'react';
import './Home.css'; 
import axios from 'axios';

const initialValues={
    username: '',
    password: '',
}

const Login = () => {
const [userInfo, setUserInfo] = useState([])
const [values, setValues] = useState(initialValues)

const thisUrl = 'fakeapi.com'

const update = (name, value) => {
    const updateUser = {[name]: value, ...values}
    setUserInfo(updateUser)
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
}

const submit = () => {
    const thisUser ={
    username: values.username.trim(),
    password: values.password
}
getUser(thisUser)
}


const onSubmit = event => {
    event.preventDefault()
    submit()
}

    return(
        <>
        <form className='loginContainer' onSubmit={onSubmit}>
        <h2>Login Here</h2>
        <div className='loginInfo'>
            <label>Username: 
                <input
                // value=
                // onChange=
                name='username'
                type='text'
                placeholder='type your username here'
                />
            </label>
            <label>Password: 
                <input
                // value=
                // onChange=
                name='password'
                type='text'
                placeholder='type your password here'
                />
            </label>
            <button type='submit'>submit</button>
        </div>
        </form>
        </>
    )

}
export default Login