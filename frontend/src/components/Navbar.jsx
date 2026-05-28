  import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        Soul<span>Space</span>
      </h2>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
