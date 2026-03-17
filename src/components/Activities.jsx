import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ActivityListItem from './ActivityListItem'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/activities')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setActivities(data)
      })
      .catch(err => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Activities</h1>
      <div>
        {activities.map(activity => (
          <Link 
            key={activity.id} 
            to={`/activities/${activity.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ActivityListItem activity={activity} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Activities
