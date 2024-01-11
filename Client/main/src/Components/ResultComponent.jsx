import React from 'react'
import { isStringEmpty } from '../utils/Common'
import MatchState from '../Constants/MatchState';
import PropTypes from 'prop-types';

const ResultComponent = ({ result }) => {
    if (result == null || isStringEmpty(result.winner)) return;
    const winner = result.winner;
    const resText = result.state === MatchState.MATCH_WON ? `${winner} won the game!` : "Game Tied :)";
    return (
        <div className='resultComponent'>{resText}</div>
    )
}

ResultComponent.propTypes = {
    result: PropTypes.shape({
        winner: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    })
}
export default ResultComponent