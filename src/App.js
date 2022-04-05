// import logo from './logo.svg';
import './App.css';
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import { useState, createContext, useEffect } from 'react'
import { boardDefault, generateWordSet, todaysWord } from './Words'
import GameOver from './components/GameOver';

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    position: 0
  })
  const [guessSet, setGuessSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, win: false})

  const [wordOfTheDay, setWordOfTheDay] = useState([])

  useEffect(() => {
    generateWordSet().then((words) => {
      setGuessSet(words["wordSet"])
    })
    todaysWord().then((word) => {
      // console.log(word)
      setWordOfTheDay(word.word.split(""))
    })
  }, []);
  
  // console.log("guessSet:", guessSet)
  function onSelectLetter(keyVal) {
		if (currAttempt.position > wordOfTheDay.length - 1) {
			return
		}
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.position] = keyVal
		setBoard(newBoard)
		setCurrAttempt({ attempt: currAttempt.attempt, position: currAttempt.position + 1 })
	}

	function onEnter() {
    const guess = board[currAttempt.attempt].join("")
    const wod = wordOfTheDay.join("")
		if (currAttempt.position != wod.length) {
			return 
		}
    if (guessSet.has(guess.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, position: 0})
    } else {
      const message = guess + " is not in the names list."
      alert(message)
      return
    }
    // console.log("currAttempt: ", currAttempt.attempt)
    if (guess === wod) {
      setGameOver({gameOver: true, win: true})
    } else if (currAttempt.attempt == 5) {
      setGameOver({gameOver: true, win: false})
    }
	}

	function onDelete() {
		if (currAttempt.position == 0) {
			return 
		}
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.position - 1] = ""
		setBoard(newBoard)
		setCurrAttempt({ attempt: currAttempt.attempt, position: currAttempt.position - 1})
	}

  return (
    <div className="App">
      <nav>
        <h1>Namedle</h1>
      </nav>
      <AppContext.Provider value={{ 
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt,
        onSelectLetter,
        onEnter,
        onDelete,
        wordOfTheDay,
        disabledLetters,
        setDisabledLetters,
        gameOver, 
        setGameOver
      }}>
        <div className='game'>
          <Board r={6} l={wordOfTheDay.length}/>
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
