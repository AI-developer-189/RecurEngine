import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status)
        setLoading(false)
      })
      .catch(() => {
        setStatus('Backend not connected')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>RecurEngine</h1>
          <p>Backend API Connection Status: {status}</p>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>Backend is running and responding!</p>
          )}
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => {
            fetch('http://localhost:3000/api/users', {
              method: 'GET',
            })
              .then((res) => res.json())
              .then((data) => {
                setUsers(data)
              })
          }}
        >
          Load Users from API
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>API Modules</h2>
          <p>The backend provides these API endpoints:</p>
          <ul>
            <li>/api/auth - Authentication</li>
            <li>/api/users - User management</li>
            <li>/api/products - Product catalog</li>
            <li>/api/plans - Subscription plans</li>
            <li>/api/subscriptions - Subscription management</li>
            <li>/api/invoices - Invoice generation</li>
            <li>/api/payments - Payment processing</li>
            <li>/api/discounts - Discount codes</li>
            <li>/api/finance - Financial reports</li>
          </ul>
        </div>
        <div id="social">
          <h2>Connect with us</h2>
          <p>Join the RecurEngine community</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
