import { useState } from 'react'
import './App.css'
import TravelerForm from './Compunents/Form/Form.jsx'
import Feed from './Compunents/Feed/Feed.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-amber-100 h-dvh'>
        <Feed/>
        <TravelerForm />
      </div>
    </>
  )
}

export default App
