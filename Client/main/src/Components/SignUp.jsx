import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 bg-blue-50 border-2 border-solid absolute top-1/2 left-1/2"
const SignUp = () => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const apiUrl = `${process.env.REACT_APP_API_URL}/signup`;
  const signup = () => {
    Axios.post(apiUrl, user).then(res => {
      console.log(res.data);
      const {token, userId, firstName, lastName, userName, hashedPassword} = res.data;
      cookies.set("token", token);
      cookies.set('userId', userId);
      cookies.set('userName', userName);
      cookies.set('firstName', firstName);
      cookies.set('lastName', lastName);
      cookies.set('hashedPassword', hashedPassword);
    })
  }

  const handleUsername = (event) => {
    setUser({ ...user, userName: event.target.value });
  }
  const handlePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  }
  return (
    <div className={containerClasses}>
      <label>SignUp</label>
      <input placeholder='Username' onChange={handleUsername} />
      <input placeholder='Password' onChange={handlePassword} />
      <button onClick={signup}> SignUp </button>
    </div>
  )
}

export default SignUp