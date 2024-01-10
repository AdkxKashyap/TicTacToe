import React, { useState } from 'react'
import Square from './Square'

const boardClasses = ""
const Board = () => {
    const [board, setBoard] = useState(["O", "X", "", "", "", "X", "", "", ""]);
    return (
        <div className='boardContainer'>
            <div className='board'>
                <div className='row'>
                    <Square value={board[0]} />
                    <Square value={board[1]} />
                    <Square value={board[2]} />
                </div>
                <div className='row'>
                    <Square value={board[3]} />
                    <Square value={board[4]} />
                    <Square value={board[5]} />
                </div>
                <div className='row'>
                    <Square value={board[6]} />
                    <Square value={board[7]} />
                    <Square value={board[8]} />
                </div>
            </div>
        </div>

    )
}

export default Board