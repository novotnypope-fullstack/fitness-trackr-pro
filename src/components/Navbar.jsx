import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'))
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/activities">Activities</NavLink>
      {!token ? (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  )
}

export default Navbar
