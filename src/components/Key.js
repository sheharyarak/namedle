import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App'


function Key({ keyVal, big }) {
	
	const  { board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onEnter, onDelete, disabledLetters } = useContext(AppContext);

	

	const onClickFn = k => {
		let f = null
		if (keyVal == "ENTER") {
			f = onEnter()
		} 
		else if (keyVal == "DELETE") {
			f = onDelete()
		} else {
			f = onSelectLetter(keyVal)
		}
	}
	
	let c = big ? "key big": "key"
	if (disabledLetters.includes(keyVal)) {
		c += " disabled"
	}
  	return (
		<div className={c} onClick={onClickFn}>{keyVal}</div>
  	)
}

export default Key