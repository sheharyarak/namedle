import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver(props) {
	const { gameOver, setGameOver, wordOfTheDay, currAttempt } = useContext(AppContext) 
  	return (
		<div className='gameOver'>
			<h3>{gameOver.win ? "You Win!" : "Better luck next time!" }</h3>
			<h1>Solution: {wordOfTheDay}</h1>
			{ gameOver.win && (<h3>You guessed in {currAttempt.attempt} guesses.</h3>)}
			<button className='share' onClick={props.onShare}>Share</button>
		</div>
  	)
}

export default GameOver