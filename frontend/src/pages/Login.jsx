  import "./Auth.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/library.jpg";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted");
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <img src={bgImage} className="auth-bg" alt="Library" />

        <div className="auth-overlay">
          <div className="auth-card login-card">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
