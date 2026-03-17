function ActivityListItem({ activity }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '12px 0', padding: '12px', borderRadius: '6px' }}>
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <small>Created by: {activity.creatorName || 'Unknown'}</small>
      {/* delete button moved to the detail page */}
    </div>
  )
}

export default ActivityListItem
