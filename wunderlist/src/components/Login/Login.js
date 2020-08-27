
import React, {useState, useEffect} from 'react';
import {Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import './Login.css';
import LoginformSchema from './LoginformSchema';
import {useSpring, animated, interpolate} from 'react-spring';
import {loginWithAuth} from '../../utils/axiosWithAuth'


const initialValues = {
  username: "",
  password: "",
};

const initialErrors = {
  username: "",
  password: "",
};
const initialDisabled = true;

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
const history = useHistory()

  const postUser = (thisUser) => {
    axios
      .post("https://reqres.in/api/login", {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    })
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        history.push('/dashboard')
      })
      .catch((error) => {
        console.log("check axios post");
      });
  };

  const submit = () => {
    const thisUser = {
      username: values.username.trim(),
      password: values.password,
    };

    postUser(thisUser);
  };

  const inputValueChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    yup
      .reach(LoginformSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [name]: error.errors[0],
        });
      });
  };

  useEffect(() => {
    //THis disables the submit button till it all the vorm validation fields are filled and validated
    LoginformSchema.isValid(values).then((valid) => {
      setDisabled(!valid);
    });
  }, [values]);

 const {o, xyz, color} = useSpring({
   from: {o: 0, xyz: [0,0,0], color: '#16425B'},
   o: .95,
   xyz: [10, 20, 5],
   color: 'white'
 })


    return(
        <>
        <div className = 'login'></div>
        <form className='loginContainer' onSubmit={submit}>
       <animated.div
         style={{
          color,
          background: o.interpolate(o => `rgba(22,66,91, ${o})`),
          // transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),/
          border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
          padding: o.interpolate({range: [0, 0.5, 1], output: [0, 0, 10]}).interpolate(o => `${o}%`),
          borderColor: o.interpolate({range: [0, 1], output: ['blue', '#81C3D7']}),
          opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
        }}
      >
         <div className='loginInfo' {...o.interpolate(n => n.toFixed(2))}>
        
        <h2 >Login Here</h2>
        
       
            <label>Username: 
                <input
                 value={values.username}
                 onChange={inputValueChange}
                name='username'
                type='text'
                placeholder='type your username here'
                />
            </label>
            <label>Password: 
                <input
                 value={values.password}
                 onChange={inputValueChange}
                name='password'
                type='text'
                placeholder='type your password here'
                />
            </label>

            <button onClick={event => {
              event.preventDefault();
              submit();
            }} className='loginButton'>submit</button>
        </div>

        <div className='myErrors'>
        <div>{errors.username}</div>
        <div>{errors.password}</div>

        </div>

        <Link to='/' className='homeLink'>Home</Link>
       
        </animated.div>
        </form>
        </>
    )

}
export default Login


