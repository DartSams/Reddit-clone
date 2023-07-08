import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './css/App.css'
import Profile from './pages/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Profile name="Dart" followerCount="12" points="6969" joinDate="Mar 2, 2002"/>
  )
}

export default App;

//main backend file will be used to handle multiple pages
