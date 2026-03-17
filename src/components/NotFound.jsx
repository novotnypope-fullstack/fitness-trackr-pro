import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, that page doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  )
}

export default NotFound
