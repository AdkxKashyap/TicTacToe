import React, { useState } from 'react'
import Square from './Square'
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { isStringEmpty } from '../utils/Common';

const Board = () => {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [showTurnMessage, setShowTurnMessage] = useState(false);
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    const [turn, setTurn] = useState(["X", "O"]);

    const updateBoard = (sqId, val) => {
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            if (newBoard[sqId] === "") {
                newBoard[sqId] = val;
            }
            return newBoard;
        })
    }
    const toggleTurn = () => {
        setTurn(prevTurn => {
            const cur = prevTurn.shift();
            prevTurn.push(cur);
            const newTurn = prevTurn;
            return newTurn;
        })
    }
    const chooseSquare = async (squareId) => {
        //this chooses whose turn it is. The player at start of this array will get turn.
        const playerTurn = turn[0];
        if (playerTurn === currentPlayer && isStringEmpty(board[squareId])) {
            //send game status to other player.
            await channel.sendEvent({
                type: "game-move",
                data: { squareId, currentPlayer, nextPlayer: turn[1] }
            });
            updateBoard(squareId, playerTurn);
            toggleTurn()
        };
    };
    channel.on((event) => {
        if (event.type === "game-move" && event.user.id !== client.userID) {
            const { squareId, currentPlayer, nextPlayer } = event.data || {};
            setCurrentPlayer(nextPlayer);
            setShowTurnMessage(true);
            updateBoard(squareId, currentPlayer);
        }
    })
    return (
        <div className='boardContainer'>
            <div className='board'>
                <div className='row'>
                    <Square handleSquareClick={chooseSquare.bind(null, 0)} value={board[0]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 1)} value={board[1]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 2)} value={board[2]} />
                </div>
                <div className='row'>
                    <Square handleSquareClick={chooseSquare.bind(null, 3)} value={board[3]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 4)} value={board[4]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 5)} value={board[5]} />
                </div>
                <div className='row'>
                    <Square handleSquareClick={chooseSquare.bind(null, 6)} value={board[6]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 7)} value={board[7]} />
                    <Square handleSquareClick={chooseSquare.bind(null, 8)} value={board[8]} />
                </div>
            </div>
            {showTurnMessage ? (<p>Its your turn</p>) : null}
        </div>

    )
}

export default Board