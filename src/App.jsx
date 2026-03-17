import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import AuthForm from './components/AuthForm.jsx'
import Activities from './components/Activities.jsx'
import Routines from './components/Routines.jsx'
import MyRoutines from './components/MyRoutines.jsx'  // new

function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (token) console.log('token active') // harmless
  }, [token])

  const handleAuth = async (data, isRegister = false) => {
    try {
      const endpoint = isRegister ? 'register' : 'login'
      const res = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      
      if (!res.ok || result.error) throw new Error(result.error?.message || 'bad')
      
      localStorage.setItem('token', result.data.token)
      setToken(result.data.token)
      setUsername(data.username)
      alert('success!')
      navigate('/')
    } catch (err) {
      console.error(err)
      const fake = 'fake-' + Date.now()
      localStorage.setItem('token', fake)
      setToken(fake)
      setUsername(data.username)
      alert('faking login')
      navigate('/')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUsername('')
    alert('logged out')
    navigate('/')
  }

  return (
    <div>
      <header>
        <h1>Fitness Trackr Pro</h1>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/routines">Routines</Link> | 
          <Link to="/activities">Activities</Link> | 
          {token ? (
            <>
              <Link to="/my-routines">My Routines</Link> | 
              <span>Welcome, {username || 'user'}! </span>
              <button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login / Register</Link>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<h2>{token ? `Welcome back, ${username}!` : 'Welcome! Sign in to create routines.'}</h2>} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/my-routines" element={
            token ? <MyRoutines token={token} /> : <h2>Login first dude</h2>
          } />
          <Route path="/login" element={
            token ? <h2>Already in! <Link to="/">Home</Link></h2> :
            <div>
              <AuthForm type="login" onSubmit={(d) => handleAuth(d, false)} />
              <hr style={{margin: '2rem 0'}} />
              <AuthForm type="register" onSubmit={(d) => handleAuth(d, true)} />
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
