import React from 'react'

const containerClasses = "flex p-6 flex-col basis-4 w-5/12 bg-blue-50 border-2 border-solid absolute top-1/2 left-1/2"
const SignUp = () => {
  return (
    <div className={containerClasses}>
    <label>SignUp</label>
    <input placeholder='Username' />
    <input placeholder='Username' />
    <button> SignUp </button>
  </div>
  )
}

export default SignUp