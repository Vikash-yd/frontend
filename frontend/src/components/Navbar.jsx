import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setOpen(false)
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <h2 className="logo">
        Library <span>Hub</span>
      </h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <li className="user-menu">
            <div
              className="user-name"
              onClick={() => setOpen(!open)}
            >
              👤 {user.name}
            </div>

            {open && (
              <div className="dropdown">
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar