import React, { useEffect, useContext, useCallback } from 'react'
import { AppContext } from '../App'
import Key from "./Key"

function makeKey(key) {
	return (
		<Key keyVal={key} />
	)
}

function Keys({ keys }) {
	keys = keys.map(makeKey)
	// console.log("KEYS: keys: ", keys)
	return (
		<>
			{ keys }
		</>
	)
}

function Keyboard () {
	const keys1 = "QWERTYUIOP".split("")
	const keys2 = "ASDFGHJKL".split("")
	const keys3 = "ZXCVBNM".split("")
	const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("")

	const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

	const handleKeyboard = useCallback(
	  (event) => {
		if (event.key === "Enter") {
			// console.log("Enter pressed")
			onEnter()
		} else if (event.key === "Backspace") {
			onDelete()
		} else {
			letters.forEach((key) => {
				if (key === event.key.toUpperCase()) {
					onSelectLetter(key)
				}
			})
		}
	  }
	)
	

	useEffect(() => {
		document.addEventListener("keydown", handleKeyboard)

		return () => {
			document.removeEventListener("keydown", handleKeyboard)
		}
	}, [handleKeyboard])

	return (
		<div className="keyboard" onKeyDown={handleKeyboard}>
			<div className='line1'>
				<Keys keys={keys1} />
			</div>
			<div className='line2'>
				<Keys keys={keys2} />
			</div>
			<div className='line3'>
				<Key keyVal={"ENTER"} big={1} />
				<Keys keys={keys3} />
				<Key keyVal={"DELETE"} big={1} />
			</div>
		</div>
	)
}

export default Keyboard 