import { useState } from 'react'

export default function MyRoutines({ token }) {
  const [myRoutines, setMyRoutines] = useState([])
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!name.trim() || !goal.trim()) {
      setError('yo name and goal needed')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, goal, isPublic })
      })
      const data = await res.json()
      console.log('api tried to create:', data) // left for debug

      if (res.ok && !data.error) {
        setMyRoutines([...myRoutines, data.routine || { name, goal, isPublic }])
        alert('created real!')
      } else {
        throw new Error('real create nope')
      }
    } catch (err) {
      console.log('real failed, mocking it') // harmless
      const mock = {
        id: Date.now(),
        name,
        goal,
        isPublic,
        creatorName: 'you (local)'
      }
      setMyRoutines([...myRoutines, mock])
      alert('api write down, added to your local list lol')
    } finally {
      setLoading(false)
      setName('')
      setGoal('')
      setIsPublic(true)
    }
  }

  return (
    <div>
      <h2>My Routines ({myRoutines.length})</h2>

      {myRoutines.length === 0 ? (
        <p>no routines yet, make one below</p>
      ) : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {myRoutines.map(r => (
            <li 
              key={r.id || r.name} 
              style={{ 
                margin: '1rem 0', 
                padding: '1rem', 
                background: r.isPublic ? '#e0ffe0' : '#fff0f0', 
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            >
              <strong>{r.name}</strong><br />
              Goal: {r.goal}<br />
              <small style={{color: r.isPublic ? 'green' : 'orange'}}>
                {r.isPublic ? 'Public' : 'Private'} - by {r.creatorName || 'you'}
              </small>
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleCreate} style={{marginTop: '2rem'}}>
        <div style={{marginBottom: '1rem'}}>
          <label>Name:</label><br />
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            style={{width: '300px', padding: '0.5rem'}}
          />
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label>Goal:</label><br />
          <input 
            type="text" 
            value={goal} 
            onChange={e => setGoal(e.target.value)}
            style={{width: '300px', padding: '0.5rem'}}
          />
        </div>
        <div style={{marginBottom: '1rem'}}>
          <input 
            type="checkbox" 
            checked={isPublic} 
            onChange={e => setIsPublic(e.target.checked)}
          />
          <label> Make public</label>
        </div>
        <button 
          type="submit" 
          disabled={loading || !token}
          style={{padding: '0.8rem 1.5rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer'}}
        >
          {loading ? 'Creating...' : 'Create Routine'}
        </button>
      </form>
    </div>
  )
}
