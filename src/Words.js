// import guessBank from './guess_bank.txt'
// import nameBank from './name_bank.txt'
import { nameBank, guessBank } from "./Banks"

export const boardDefault = [
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],	
]

export function generateWordSet() {
	const wordSet = new Set(guessBank)
	// const debugGuesses = ["DDDAADDD", "GGGGGDDD"]
	// debugGuesses.forEach(e => wordSet.add(e.toLowerCase()))
	return { wordSet }
}

// export async function generateWordSet() {
// 	let wordSet;
// 	await fetch(guessBank)
// 	.then((res) => {
// 		return res.text()
// 	})
// 	.then((result) => {
// 		const wordArray = result.split('\r\n')
// 		wordSet = new Set(wordArray)
// 	})

// 	return { wordSet };
// }

export function todaysWord() {
	const startDate = new Date(2022, 1, 17);
	const index = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24))
	const word = nameBank[index].toUpperCase()
	// const word = "ABCDDEFG"
	// console.log(word)
	return { word }
}

// export async function todaysWord() {
// 	let word;
// 	await fetch(nameBank)
// 	.then((res) => {
// 		return res.text()
// 	})
// 	.then((result) => {
// 		const wordArray = result.split('\r\n')
		
// 		const startDate = new Date(2022, 1, 17);
// 		const index = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24))
// 		// const index = Math.floor(Math.random() * wordArray.length)
// 		word = wordArray[index].toUpperCase()
// 	})

// 	return { word };
// }

