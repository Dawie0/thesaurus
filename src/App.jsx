import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './components/Card'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState(null)
  const [canPopulate, setCanPopulate] = useState(false)

  useEffect(() => {
    if (response) {
      setCanPopulate(true)
    }
  }, [response])

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fetchResponse()
  }

  const fetchResponse = async () => {
    try {
      const res = await axios.get(`https://api.datamuse.com/words?ml=${input}`)
      setResponse(res.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  const populate = () => {
    const responseLength = response.length
    const index = Math.floor(Math.random() * responseLength)
    
    return (
      <Card word={response[index]} />
    )
  }
  
  return (
    <>
      <div>
        <label htmlFor='input'>Enter a word or phrase</label>
      </div>
      <div>
        <input 
          id='input'
          placeholder='Ringing in the ears'
          value={input}
          onChange={(e) => setInput(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleClick}>Search</button>
      </div>
      <div>
        {canPopulate && populate()}
      </div>
    </>
  )
}

export default App
