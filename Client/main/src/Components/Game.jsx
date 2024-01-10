import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Game = ({ channel }) => {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    })
    return (
        <>
            {!playersJoined ?
                (
                    <p>Waiting For Players....</p>
                ) :
                (
                    <div>Game</div>
                )}
        </>
    );
}

Game.propTypes = {
    channel: {
        state: PropTypes.object.isRequired,
    }
}
export default Game