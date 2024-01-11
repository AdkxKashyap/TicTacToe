import React, { useEffect, useState } from 'react'
import Square from './Square'
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Patterns } from '../utils/WinningPatterns';
import { isStringEmpty } from '../utils/Common';
import PlayPiece from '../Constants/PlayPiece';
import MatchState from '../Constants/MatchState';
import PropTypes from 'prop-types';

const Board = ({ setMatchResult, customBoardClasses }) => {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [turn, setTurn] = useState("X")
    const [showTurnMessage, setShowTurnMessage] = useState(false);

    useEffect(() => {
        checkWinner();
        checkIfTie();
    }, [board])

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    const checkWinner = () => {
        Patterns.forEach((pattern) => {
            /** this will select the first symbol. eg if pattern[0] is 3,
             this will give the symbol at board[3] and then we can check if that is winning symbol*/
            const playSymbol = board[pattern[0]];
            if (isStringEmpty(playSymbol)) return;
            let foundWinner = true;
            pattern.forEach(idx => {
                if (board[idx] !== playSymbol) {
                    foundWinner = false;
                }
            })
            if (foundWinner) {
                const res = {
                    winner: playSymbol,
                    state: MatchState.MATCH_WON,
                }
                setMatchResult(res);
            }
        })
    }

    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });

        if (filled) {
            setMatchResult({ winner: "none", state: MatchState.MATCH_TIE });
        }
    };

    const updateBoard = (sqId, val) => {
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            if (newBoard[sqId] === "") {
                newBoard[sqId] = val;
            }
            return newBoard;
        })
    }
    const chooseSquare = async (squareId) => {
        //this chooses whose turn it is. The player at start of this array will get turn.
        if (turn === currentPlayer && board[squareId] === "") {
            setTurn(currentPlayer === PlayPiece.PIECE_X ? PlayPiece.PIECE_O : PlayPiece.PIECE_X);
            setShowTurnMessage(false);
            await channel.sendEvent({
                type: "game-move",
                data: { squareId, currentPlayer },
            });
            updateBoard(squareId, currentPlayer);
        }
    };
    channel.on((event) => {
        if (event.type === "game-move" && event.user.id !== client.userID) {
            const { squareId, currentPlayer } = event.data || {};
            const nextPlayer = currentPlayer === "X" ? "O" : "X";
            setCurrentPlayer(nextPlayer);
            setTurn(nextPlayer);
            setShowTurnMessage(true);
            updateBoard(squareId, currentPlayer);
        }
    })
    return (
        <div className={`${customBoardClasses} boardContainer`}>
            {showTurnMessage ? (<span className='boardTurnMessage'>Its your turn!</span>) : null}
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
        </div>

    )
}

Board.propTypes = {
    setMatchResult: PropTypes.func.isRequired,
}
export default Board