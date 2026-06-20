import { useState, useEffect } from "react";
import "./Auth.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/library.jpg";

function Register() {
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age <= 15) {
      alert("Age must be greater than 15");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber: mobile,
          address: "",
          role: "MEMBER"
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        alert(data || "Registration failed");
        return;
      }

      alert("Registration successful!");
      console.log("Server response:", data);

      e.target.reset();
      setDob("");
      setMobile("");

    } catch (error) {
      console.error(error);
      alert("Server error. Check backend.");
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
              <input name="name" type="text" placeholder="Name" required />
              <input name="username" type="text" placeholder="Username" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Password" required />

              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: "10px" }}>
  Already registered?{" "}
  <a href="/login" style={{ color: "blue", cursor: "pointer" }}>
    Login here
  </a>
</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;