import React from 'react'
import Letter from './Letter'

function Row({l, a}) {
	// console.log("ROW: l: ", l)

	let letters = []

	for (let i = 0; i < l; i++) {
		letters.push(
			<Letter letterPos={i} attemptVal={a} />
		)
	}
	// console.log("letters: ", letters)
	return (
		<div className='row'>
			{ letters }
		</div>
	)
}

function Board({ r, l }) {
	// console.log("BOARD: props: ", )
	let rows = []
	for (let i = 0; i < r; i++) {
		rows.push(
			<Row l={l} a={i} />
		)
	}
	// console.log("rows: ", rows)
	return (
		<div className='board'>
			{ rows }
		</div>
	)
}

Board.defaultProps = {
	r: 6,
	l: 6
}

export default Board