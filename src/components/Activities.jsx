import { useState, useEffect } from 'react'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchActivities = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities')
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`)
      }
      const data = await res.json()
      
      // api returns direct array, not wrapped in data.activities
      setActivities(Array.isArray(data) ? data : data.activities || data.data?.activities || [])
      console.log('activities fetched', data) // left this to check in console what we got
    } catch (err) {
      setError(`couldnt load: ${err.message} - try refresh`)
      console.error('fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  if (loading) return <p>loading activities...</p>
  if (error) return (
    <div>
      <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>
      <button onClick={fetchActivities} style={{padding: '0.5rem 1rem', marginTop: '1rem'}}>
        Try Again
      </button>
    </div>
  )

  return (
    <div>
      <h2>Activities ({activities.length} total)</h2>
      {activities.length === 0 ? (
        <p>no activities found weirdly</p>
      ) : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {activities.map(act => (
            <li key={act.id} style={{margin: '1.5rem 0', padding: '1rem', background: '#f9f9f9', borderRadius: '6px'}}>
              <strong>{act.name}</strong>
              <p style={{margin: '0.5rem 0'}}>{act.description || 'no description'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
