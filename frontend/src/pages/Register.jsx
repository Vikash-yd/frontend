import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/library.jpg";
import { useEffect } from "react";

function Register() {
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const navigate = useNavigate();

  // ✅ Full form state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: ""
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile validation
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );

      console.log("Registered:", response.data);
      alert("User registered successfully ✅");

      // ✅ Reset form
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        mobile: ""
      });

      // ✅ Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <img src={bgImage} className="auth-bg" alt="Library" />

        <div className="auth-overlay">
          <div className="auth-card">
            <h2>Register</h2>

            <form onSubmit={handleSubmit} className="auth-form">

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <button type="submit">Register</button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;