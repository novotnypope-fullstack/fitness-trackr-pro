import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ActivityDetail() {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`http://localhost:3000/api/activities/${activityId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setActivity(data)
      })
      .catch(err => setError(err.message))
  }, [activityId])

  const handleDelete = async () => {
    if (!token) return

    try {
      const res = await fetch(`http://localhost:3000/api/activities/${activityId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      
      if (data.error) throw new Error(data.error)
      
      alert('Activity deleted!')
      navigate('/activities')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error) return <p>Error: {error}</p>
  if (!activity) return <p>Loading activity...</p>

  return (
    <div>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName || 'Unknown'}</p>
      
      {token && <button onClick={handleDelete}>Delete Activity</button>}
      <button onClick={() => navigate('/activities')}>Back to Activities</button>
    </div>
  )
}

export default ActivityDetail
