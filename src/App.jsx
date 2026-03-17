import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Activities from './components/Activities'
import ActivityDetail from './components/ActivityDetail'
import Register from './components/Register'
import Login from './components/Login'
import NotFound from './components/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="activities" element={<Activities />} />
        <Route path="activities/:activityId" element={<ActivityDetail />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
