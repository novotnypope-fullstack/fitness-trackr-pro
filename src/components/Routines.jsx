import { useState, useEffect } from 'react'

export default function Routines() {
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRoutines = () => {
    setLoading(true)
    setError('')
    fetch('https://fitnesstrac-kr.herokuapp.com/api/routines')
      .then(res => {
        console.log('status:', res.status) // debug
        if (!res.ok) throw new Error('bad status ' + res.status)
        return res.json()
      })
      .then(data => {
        console.log('full data from api:', data) // open console and look here!!
        setRoutines(data || []) // direct array, no wrapper
      })
      .catch(err => {
        setError('oops: ' + err.message)
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRoutines()
  }, [])

  if (loading) return <p>loading routines...</p>

  if (error) return (
    <div>
      <p style={{color: 'red'}}>{error}</p>
      <button onClick={fetchRoutines}>Try Again</button>
    </div>
  )

  return (
    <div>
      <h2>Public Routines ({routines.length})</h2>
      <button onClick={fetchRoutines} style={{marginBottom: '1rem'}}>Refresh List</button>
      {routines.length === 0 ? (
        <p>still empty? check console for 'full data from api:' — should show array with 2 items</p>
      ) : (
        routines.map(r => (
          <div key={r.id} style={{marginBottom: '1.5rem', padding: '1rem', border: '1px solid #aaa', borderRadius: '8px'}}>
            <h3>{r.name} by {r.creatorName}</h3>
            <p><strong>Goal:</strong> {r.goal}</p>
            <p>{r.isPublic ? 'Public' : 'Private'}</p>
            {r.sets?.length > 0 && (
              <>
                <strong>Activities in routine:</strong>
                <ul style={{marginTop: '0.5rem'}}>
                  {r.sets.map((s, i) => (
                    <li key={i}>
                      {s.name} ({s.count} x {s.duration} min)
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}
