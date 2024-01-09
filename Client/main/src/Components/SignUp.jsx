import React, { useState } from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';
import FormItem from '../Constants/FormItemsItems';

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 bg-blue-100 shadow-md";
const formFieldClasses = "mt-2 p-1.5 border border-solid border-sky-400 focus:outline-none focus:border-sky-600";
const buttonClasses = "bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 mt-1.5 transition ease-in duration-300";
const SignUp = () => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const apiUrl = `${process.env.REACT_APP_API_URL}/signup`;
  const signup = () => {
    Axios.post(apiUrl, user).then(res => {
      const { token, userId, firstName, lastName, userName, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set('userId', userId);
      cookies.set(FormItem.USERNAME, userName);
      cookies.set(FormItem.FIRSTNAME, firstName);
      cookies.set(FormItem.LASTNAME, lastName);
      cookies.set('hashedPassword', hashedPassword);
    })
  }

  const handleItemChange = (field, event) => {
    setUser({ ...user, [field]: event.target.value });
  }
  // TODO: add validations for button. Disable it
  return (
    <div className={containerClasses}>
      <label>Sign Up</label>
      <input
        placeholder='Username'
        onChange={handleItemChange.bind(null, FormItem.USERNAME)}
        className={formFieldClasses}
      />
      <input
        placeholder='Password'
        onChange={handleItemChange.bind(null, FormItem.PASSWORD)}
        className={formFieldClasses}
      />
      <input
        placeholder='Firstname'
        onChange={handleItemChange.bind(null, FormItem.FIRSTNAME)}
        className={formFieldClasses} />
      <input
        placeholder='Lastname'
        onChange={handleItemChange.bind(null, FormItem.LASTNAME)}
        className={formFieldClasses} />
      <button onClick={signup} className={buttonClasses}> Done </button>
    </div >
  )
}

export default SignUp