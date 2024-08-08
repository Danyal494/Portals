import { useState } from 'react'

import './App.css'
import Experience  from './components/Experience'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[#87CEEB]'>
    
    <Experience/>
   
    </div>
  )
}

export default App
