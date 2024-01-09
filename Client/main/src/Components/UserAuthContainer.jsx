import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const containerClasses = "absolute inset-0 flex items-center justify-center"
const customClasses = "ml-8"
const UserAuthContainer = () => {
    return (
        <div className={containerClasses}>
            <SignUp />
            <Login customClasses = {customClasses} />
        </div>
    )
}

export default UserAuthContainer