import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const containerClasses = "absolute inset-0 flex items-center justify-center"
const customClasses = "ml-8"
const UserAuthContainer = ({ setIsAuth }) => {
    return (
        <div className={containerClasses}>
            <SignUp setIsAuth={setIsAuth} />
            <Login
                customClasses={customClasses}
                setIsAuth={setIsAuth}
            />
        </div>
    )
}

export default UserAuthContainer