import { useState } from 'react'

export default function AuthForm({ type, onSubmit }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('yo fill both fields')
      return
    }
    setLoading(true)
    try {
      await onSubmit({ username, password })
    } catch (err) {
      setError(err.message || 'something went wrong bro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value.trim())}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem', background: '#333', color: 'white', border: 'none' }}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
