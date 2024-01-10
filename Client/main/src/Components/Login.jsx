import React from 'react'
import { useState } from 'react';
import UserInfo from '../Constants/UserInfo';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 bg-blue-100 shadow-md";
const formFieldClasses = "mt-2 p-1.5 border border-solid border-sky-400 focus:outline-none focus:border-sky-600";
const buttonClasses = "bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 mt-1.5 transition ease-in duration-300";

const Login = ({ customClasses, setIsAuth }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
  const handleButtonClick = () => {
    Axios.post(apiUrl, user).then(res => {
      console.log("LoggedIn: ", res.data);
      const { token, userId, firstName, lastName, userName, hashedPassword } = res.data;
      setIsAuth(true);
      cookies.set(UserInfo.TOKEN, token);
      cookies.set(UserInfo.USERID, userId);
      cookies.set(UserInfo.USERNAME, userName);
      cookies.set(UserInfo.FIRSTNAME, firstName);
      cookies.set(UserInfo.LASTNAME, lastName);
      cookies.set(UserInfo.HASHEDPW, hashedPassword);
    }).catch(err => console.log(err.response.data));
  }
  const handleItemChange = (field, event) => {
    setUser({ ...user, [field]: event.target.value });
  }
  return (
    <div className={`${containerClasses} ${customClasses}`}>
      <label>Login</label>
      <input
        placeholder='Username'
        onChange={handleItemChange.bind(null, UserInfo.USERNAME)}
        className={formFieldClasses}
      />
      <input
        placeholder='Password'
        onChange={handleItemChange.bind(null, UserInfo.PASSWORD)}
        className={formFieldClasses}
      />
      <button className={buttonClasses} onClick={handleButtonClick}> Ok </button>
    </div>


  )
}

export default Login