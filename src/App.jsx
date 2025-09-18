import { useState } from 'react'
import './App.css'
import TestConnection from './TestConnection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Ecomm App Fontend</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Frontend Connected
           <TestConnection />
        </p>
      </div>
    </>
  )
}

export default App
