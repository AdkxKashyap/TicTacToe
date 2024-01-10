import React from 'react'
import PropTypes from 'prop-types';

const squareClasses = "bg-purple-600 hover:bg-purple-800 border border-purple-700 hover:border-purple-900 transition duration-300 ease-in-out p-4"
const Square = ({ handleSquareClick, value }) => {
    return (
        <div className={`${squareClasses} square`} onClick={handleSquareClick}>
            {value}
        </div>
    )
}

Square.prototype = {
    value: PropTypes.string.isRequired,
    handleSquareClick: PropTypes.func.isRequired,
}
export default Square