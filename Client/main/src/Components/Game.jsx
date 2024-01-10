import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Board from './Board';

const boardContainerClasses = "flex justify-center items-center columns-3 gap-100"
const Game = ({ channel }) => {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    })
    if (!playersJoined) {
        return (<p>Waiting For Players....</p>)
    }
    return (
        <div className={boardContainerClasses}>
            <Board />
        </div>

    );
}

// Game.propTypes = {
//     channel: {
//         state: PropTypes.object.isRequired,
//     }
// }
export default Game