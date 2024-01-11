import React from 'react'
import { isStringEmpty } from '../utils/Common'
import MatchState from '../Constants/MatchState';
import PropTypes from 'prop-types';

const buttonClasses = "bg-purple-500 w-12 mt-3 rounded-md shadow-lg hover:shadow-purple-500/50 mt-1.5 transition ease-in duration-300";
const resTxtClasses = "text-yellow-500"
const ResultComponent = ({ result, handleButtonClick }) => {
    if (result == null || isStringEmpty(result.winner)) return;
    const winner = result.winner;
    const resText = result.state === MatchState.MATCH_WON ? `${winner} won the game!` : "Game Tied :)";

    return (
        <div className='resultComponent'>
            <div className={resTxtClasses}>{resText}</div>
            <button className={buttonClasses} onClick={handleButtonClick}>Ok</button>
        </div>
    )
}

ResultComponent.propTypes = {
    result: PropTypes.shape({
        winner: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    })
}
export default ResultComponent