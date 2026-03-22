import { useState } from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState(0);

  function increaseCount(){
    setCount(count + 1);
  }

  function decraseCount(){
    count > 0 ? setCount(count - 1) : ""
  }

  function resetCount(){
    setCount(0);
  }

  return (
    <>
    <h1>Compteur</h1>

    <button className="button-plus" onClick={() => increaseCount()}>+</button>
    <div className="count">{count}</div>
    <button className="button-minus" onClick={() => decraseCount()}>-</button>

    <button className="button-reset" onClick={() => resetCount()}>RESET</button>

    </>
  )
}

export default App
