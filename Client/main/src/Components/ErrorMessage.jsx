import React from 'react'
import { isStringEmpty } from '../utils/Common'

const errorTextClasses = "text-xs text-red-500"
const ErrorMessage = ({ errorMsg }) => {
    if (isStringEmpty(errorMsg)) {
        return;
    }
    return (
        <p className={errorTextClasses}>{errorMsg}</p>
    )
}

export default ErrorMessage