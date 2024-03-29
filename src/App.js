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
  const [todaysIndex, setTodaysIndex] = useState(0)
  const [wordOfTheDay, setWordOfTheDay] = useState([])

  useEffect(() => {
    // generateWordSet().then((words) => {
    //   setGuessSet(words["wordSet"])
    // })
    setGuessSet(generateWordSet()["wordSet"])
    // todaysWord().then((word) => {
    //   // console.log(word)
    //   setWordOfTheDay(word.word.split(""))
    // })
    const tw = todaysWord(new Date())
    setWordOfTheDay(tw.word.split(""))
    setTodaysIndex(tw.index)
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
		if (currAttempt.position !== wod.length) {
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
    } else if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, win: false})
    }
	}

	function onDelete() {
		if (currAttempt.position === 0) {
			return 
		}
		const newBoard = [...board]
		newBoard[currAttempt.attempt][currAttempt.position - 1] = ""
		setBoard(newBoard)
		setCurrAttempt({ attempt: currAttempt.attempt, position: currAttempt.position - 1})
	}

  function onShare() {
    const letterStates = () => {
      let states = ""
      for (let j = 0; j < currAttempt.attempt; j++) {
        let row = board[j]
        for (let i = 0; i < wordOfTheDay.length; i++) {
          const letter = row[i]
          const correct = wordOfTheDay[i] === letter
          const almost = !correct && letter !== "" && wordOfTheDay.includes(letter)
          // let extra = wordOfTheDay.filter(x => x === letter).length < board[attemptVal].filter(x => x === letter).length
          let not_extra = row.filter(x => x === letter).length - wordOfTheDay.filter(x => x === letter).length
          if (not_extra > 0) {
            not_extra = row.slice(0, i).filter(x => x === letter).length < wordOfTheDay.filter(x => x === letter).length
          } else {
            not_extra = true
          }
          /*
          ⬛🟩🟨
          */
         const letterState = (correct ? "🟩" : (almost && not_extra)? "🟨" : "⬛" );
         states += letterState
        }
        states += '\n'
      }
      return states
    }
    const finalAttempt = gameOver.win ? currAttempt.attempt : 'X'
    const text = `Namedle ${todaysIndex + 1} ${finalAttempt}/6\n\n${letterStates()}`
    const toBeShared = {
      title: "Namedle",
      text: text
    }
    console.log(toBeShared)
    console.log(Boolean(navigator.share))
    if (navigator.share){
    navigator
      .share(toBeShared)
      .then(() => console.log("Share was successful."))
      .catch((error: DOMException) =>
        alert(
          `Sharing failed! Code: ${error.code} | Name: ${
            error.message
          } | Message: ${error.message}`
        )
      );
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert("Result has been copied to clipboard");
      } else {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          alert('Fallback: Copying text command was ' + msg);
        } catch (err) {
          alert('Fallback: Oops, unable to copy');
        }

        document.body.removeChild(textArea);
      }
    }
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
          {gameOver.gameOver ? <GameOver onShare={onShare}/> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
