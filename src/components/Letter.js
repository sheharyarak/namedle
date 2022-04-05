import React, { useContext, useEffect } from 'react'
import { AppContext } from "../App"


function Letter({letterPos, attemptVal }) {
	const { board, setBoard, wordOfTheDay, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext)
	const letter = board[attemptVal][letterPos]

	const correct = wordOfTheDay[letterPos] === letter
	const almost = !correct && letter !== "" && wordOfTheDay.includes(letter)
	let extra = wordOfTheDay.filter(x => x === letter).length < board[attemptVal].filter(x => x === letter).length
	let c = 'letter '
	const letterState = 
		currAttempt.attempt > attemptVal &&
		(correct ? "correct" : (almost && !extra)? "almost" : "error" )

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