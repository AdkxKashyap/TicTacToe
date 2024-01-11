import React from 'react'
import { useState } from 'react';
import UserInfo from '../Constants/UserInfo';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { isStringEmpty, isNull } from '../utils/Common';
import ErrorMessage from './ErrorMessage';

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 shadow-md";
const formFieldClasses = "mt-2 p-1.5 bg-purple-200 rounded-md hover:bg-purple-300 focus:bg-purple-300 px-3 focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out";
const buttonClasses = "bg-purple-500 rounded-md shadow-lg hover:shadow-purple-500/50 mt-1.5 transition ease-in duration-300";

const Login = ({ customClasses, setIsAuth }) => {
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const cookies = new Cookies();
  const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
  const handleButtonClick = () => {
    const { userName, password } = user || {};
    if (isStringEmpty(userName) || isStringEmpty(password)) {
      setErrMsg("Username and password is required");
      return;
    } else {
      setErrMsg("");
    }
    Axios.post(apiUrl, user).then(res => {
      console.log("LoggedIn: ", res.data);
      const { token, userId, firstName, lastName, userName, hashedPassword } = res.data;
      if (isNull(userId) || isStringEmpty(userName) || isStringEmpty(hashedPassword)) {
        setErrMsg("Login failed");
        return;
      }
      setIsAuth(true);
      cookies.set(UserInfo.TOKEN, token);
      cookies.set(UserInfo.USERID, userId);
      cookies.set(UserInfo.USERNAME, userName);
      cookies.set(UserInfo.FIRSTNAME, firstName);
      cookies.set(UserInfo.LASTNAME, lastName);
      cookies.set(UserInfo.HASHEDPW, hashedPassword);
    }).catch(err => {
      const { error } = err.response.data || {};
      const msg = error || 'Something went wrong';
      setErrMsg(msg);
      console.log(err.response.data)
    });
  }
  const handleItemChange = (field, event) => {
    setUser({ ...user, [field]: event.target.value });
  }
  return (
    <div className={`${containerClasses} ${customClasses} formCommon`}>
      <label>Login</label>
      <input
        placeholder='Username'
        onChange={handleItemChange.bind(null, UserInfo.USERNAME)}
        className={formFieldClasses}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={handleItemChange.bind(null, UserInfo.PASSWORD)}
        className={formFieldClasses}
      />
      <button className={buttonClasses} onClick={handleButtonClick}> Ok </button>
      {!isStringEmpty(errMsg) ? <ErrorMessage errorMsg={errMsg} /> : null}
    </div>


  )
}

export default Login