import React, { useContext, useEffect } from 'react'
import { AppContext } from "../App"


function Letter({letterPos, attemptVal }) {
	const { board, wordOfTheDay, currAttempt, setDisabledLetters } = useContext(AppContext)
	const letter = board[attemptVal][letterPos]

	const correct = wordOfTheDay[letterPos] === letter
	const almost = !correct && letter !== "" && wordOfTheDay.includes(letter)
	// let extra = wordOfTheDay.filter(x => x === letter).length < board[attemptVal].filter(x => x === letter).length
	const not_extra = (board[attemptVal].slice(0, letterPos).filter(x => x === letter).length < wordOfTheDay.filter(x => x === letter).length)
	let c = 'letter '
	const letterState = 
		currAttempt.attempt > attemptVal &&
		(correct ? "correct" : (almost && not_extra)? "almost" : "error" )

	useEffect(() => {
		if (letter !== "" && !correct && !almost) {
			setDisabledLetters((prev) => [...prev, letter])
		}
	}, [currAttempt.attempt]);
	return (
		<div className={c + letterState}>{letter}</div>
	)
}

export default Letter