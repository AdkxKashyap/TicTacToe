import React, { useState } from 'react'
import "../CSS/Chat.css";
import PropTypes from 'prop-types';
import Board from './Board';
import { isStringEmpty } from '../utils/Common';
import ResultComponent from './ResultComponent';
import { Window, MessageList, MessageInput } from "stream-chat-react";

const boardContainerClasses = "flex justify-center items-center columns-3 gap-100"
const boardClasses = "mr-8";
const buttonClasses = "bg-purple-500 p-2 w-4/12 shadow-lg hover:shadow-purple-500/50 rounded-md mt-1.5 transition ease-in duration-300";
const Game = ({ channel, setChannel }) => {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [matchResult, setMatchResult] = useState({ winner: "", state: "" });
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    })
    if (!playersJoined) {
        return (<p>Waiting For Players....</p>)
    }
    const handleLeaveGameClick = async () => {
        await channel.stopWatching();
        setChannel(null);
    }
    return (
        <div className={boardContainerClasses}>
            {
                isStringEmpty(matchResult.state) ? (
                    <>
                        <Board
                            matchResult={matchResult}
                            setMatchResult={setMatchResult}
                            customBoardClasses={boardClasses}
                        />
                        <div className='chatWindowContainer'>
                            <Window>
                                <MessageList
                                    disableDateSeparator
                                    closeReactionSelectorOnClick
                                    hideDeletedMessages
                                    messageActions={["react"]}
                                />
                                <MessageInput noFiles />
                            </Window>
                            <button
                                onClick={handleLeaveGameClick}
                                className={buttonClasses}
                            >
                                {" "}
                                Leave Game
                            </button>
                        </div>
                    </>
                ) :
                    (<ResultComponent result={matchResult} />)
            }
        </div>

    );
}

Game.propTypes = {
    channel: PropTypes.shape({
        state: PropTypes.object.isRequired,
        stopWatching: PropTypes.func.isRequired,
    }),
    setChannel: PropTypes.func.isRequired,
}
export default Game