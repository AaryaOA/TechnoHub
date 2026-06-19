import { useEffect, useState } from 'react'
import './App.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Addproduct from './Pages/Addproduct.jsx'


function App() {
  const [view, setView] = useState('login')

  useEffect(() => {
    if (view !== 'login' && !localStorage.getItem('token')) {
      setView('login')
    }
  }, [view])

  const handleNavigate = (newView) => {
    setView(newView)
  }

  return (
    <div className="App">
      {view === 'home' ? (
        <Home onNavigate={handleNavigate} />
      ) : view === 'login' ? (
        <Login onSwitch={() => setView('signup')} onLogin={() => setView('home')} />
      ) : view === 'signup' ? (
        <Signup onSwitch={() => setView('login')} />
      ) : view === 'addproduct' ? (
        <Addproduct onNavigate={handleNavigate} />
      ) : null}
    </div>
  )
}

export default App
