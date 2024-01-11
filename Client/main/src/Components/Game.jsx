import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Board from './Board';
import { isStringEmpty } from '../utils/Common';
import ResultComponent from './ResultComponent';

const boardContainerClasses = "flex flex-col justify-center items-center columns-3 gap-100"
const Game = ({ channel }) => {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [matchResult, setMatchResult] = useState({ winner: "", state: "" });
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    })
    if (!playersJoined) {
        return (<p>Waiting For Players....</p>)
    }
    return (
        <div className={boardContainerClasses}>
            {
                isStringEmpty(matchResult.state) ? (<Board
                    matchResult={matchResult}
                    setMatchResult={setMatchResult}
                />) :
                    (<ResultComponent result={matchResult} />)
            }
        </div>

    );
}

Game.propTypes = {
    channel: PropTypes.shape({
        state: PropTypes.object.isRequired,
    })
}
export default Game