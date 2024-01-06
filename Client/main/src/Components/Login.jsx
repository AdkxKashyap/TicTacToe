import React from 'react'

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 bg-blue-50 border-2 border-solid absolute top-1/2 left-1/2"
const Login = () => {
  return (
    <div className={containerClasses}>
      <label>Login</label>
      <input placeholder='Username' />
      <input placeholder='Username' />
      <button> Login </button>
    </div>


  )
}

export default Login