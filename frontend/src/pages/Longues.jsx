import { useNavigate } from "react-router-dom";
import {
  FaComments,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaBullseye,
  FaCoffee,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Longues.css";
import { useEffect, useState } from "react";

function Longues() {
  const navigate = useNavigate();

  const [lounges, setLounges] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchLounges();
  }, []);

  const fetchLounges = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/lounges");

      const data = await response.json();

      const loungesWithIcons = data.map((lounge, index) => ({
        ...lounge,
        icon: getIcon(index),
      }));

      setLounges(loungesWithIcons);
    } catch (error) {
      console.error("Error fetching lounges:", error);
    }
  };

  const getIcon = (index) => {
    const icons = [
      <FaComments />,
      <FaBookOpen />,
      <FaUsers />,
      <FaLightbulb />,
      <FaBullseye />,
      <FaCoffee />,
    ];

    return icons[index % icons.length];
  };

  const handleExploreSpaces = () => {
    const section = document.getElementById("lounges-section");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewActivities = () => {
    navigate("/activities");
  };

  const handleCardClick = (id) => {
    navigate(`/longues/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="longues-page">
        <section className="longues-hero">
          <div className="longues-hero-overlay">
            <p className="longues-subtitle">Connect • Learn • Grow</p>

            <h1 className="page-heading">Community Lounges</h1>

            <p className="longues-description">
              Discover interactive spaces made for collaboration, quiet
              reading, focused study, and student engagement.
            </p>

            <div className="longues-hero-buttons">
              <button
                className="primary-btn"
                onClick={handleExploreSpaces}
              >
                Explore Spaces
              </button>

              <button
                className="secondary-btn"
                onClick={handleViewActivities}
              >
                View Activities
              </button>
            </div>
          </div>
        </section>

        <section className="lounges-section" id="lounges-section">
          <h2 className="section-heading">Choose Your Space</h2>

          <div className="lounges-grid">
            {lounges.map((lounge) => (
              <div className="lounge-card" key={lounge.id}>
                <div className="lounge-icon">{lounge.icon}</div>

                <h3>{lounge.title}</h3>

                <p>{lounge.description}</p>

                <button
                  className="card-btn"
                  onClick={() => handleCardClick(lounge.id)}
                >
                  Explore Lounge
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Longues;