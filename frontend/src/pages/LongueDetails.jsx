import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LongueDetails.css";

function LongueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/events/lounge/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setApiEvents(data);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  // 🧠 Static fallback (your friend’s full design preserved)
  const pageData = useMemo(
    () => ({
      "discussion-room": {
        title: "Discussion Room",
        subtitle: "Interactive conversations, doubt solving, and peer learning",
        description:
          "Join engaging academic discussions, share ideas, ask doubts, and connect with learners.",
        stats: {
          timing: "9:00 AM - 7:00 PM",
          location: "Block A",
          capacity: "40 seats",
          format: "Live discussions",
        },
        sessions: [
          {
            title: "Open Discussion on Literature & Society",
            date: "2 April 2026",
            time: "11:00 AM - 12:00 PM",
            host: "Dr. Meera Sharma",
            venue: "Hall A",
            seats: "12 seats left",
            level: "Open for All",
            tag: "Popular",
            about: "A guided discussion on literature and society.",
          },
        ],
      },

      "reading-zone": {
        title: "Reading Zone",
        subtitle: "Silence and deep reading",
        description:
          "A calm, distraction-free area for study and reading.",
        stats: {
          timing: "8:00 AM - 9:00 PM",
          location: "Central Wing",
          capacity: "60 seats",
          format: "Silent zone",
        },
        sessions: [
          {
            title: "Morning Silent Reading",
            date: "2 April 2026",
            time: "9:00 AM - 11:00 AM",
            host: "Library Club",
            venue: "Reading Hall 1",
            seats: "20 seats left",
            level: "All",
            tag: "Recommended",
            about: "Peaceful morning reading session.",
          },
        ],
      },
    }),
    []
  );

  const currentPage = pageData[id];

  // 👉 If API works → use API
  const sessionsToShow =
    apiEvents.length > 0
      ? apiEvents.map((e) => ({
          title: e.title,
          date: e.eventDate,
          time: e.eventTime,
          host: e.hostName,
          venue: e.venue || "Main Hall",
          seats: `${e.seatsLeft} seats left`,
          level: "Live",
          tag: e.tags?.[0] || "Event",
          about: e.description,
        }))
      : currentPage?.sessions || [];

  if (!currentPage) {
    return (
      <>
        <Navbar />
        <div className="longue-details-page">
          <div className="details-wrapper">
            <h2>Page not found</h2>
            <button onClick={() => navigate("/longues")}>
              Back to Longues
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="longue-details-page">
        <div className="details-wrapper">

          {/* HERO */}
          <section className="details-hero-card">
            <div className="details-hero-content">
              <p className="details-small-label">SMART LIBRARY EXPERIENCE</p>
              <h1>{currentPage.title}</h1>
              <h3>{currentPage.subtitle}</h3>
              <p className="details-description">
                {currentPage.description}
              </p>
            </div>
          </section>

          {/* STATS */}
          <section className="details-stats-grid">
            <div className="stat-card">
              <span>Timing</span>
              <h4>{currentPage.stats.timing}</h4>
            </div>
            <div className="stat-card">
              <span>Location</span>
              <h4>{currentPage.stats.location}</h4>
            </div>
            <div className="stat-card">
              <span>Capacity</span>
              <h4>{currentPage.stats.capacity}</h4>
            </div>
            <div className="stat-card">
              <span>Format</span>
              <h4>{currentPage.stats.format}</h4>
            </div>
          </section>

          {/* SESSIONS */}
          <section className="sessions-section">
            <div className="section-top">
              <h2>Sessions</h2>
              <button onClick={() => navigate("/activities")}>
                View Activities
              </button>
            </div>

            <div className="session-grid">
              {loading ? (
                <h3>Loading...</h3>
              ) : sessionsToShow.length === 0 ? (
                <h3>No sessions available</h3>
              ) : (
                sessionsToShow.map((session, i) => (
                  <div className="session-card" key={i}>
                    <h3>{session.title}</h3>
                    <p>{session.about}</p>

                    <div>
                      <strong>{session.date}</strong> |{" "}
                      <strong>{session.time}</strong>
                    </div>

                    <button
                      onClick={() => navigate(`/event/${id}`)}
                    >
                      View Session
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* BACK BUTTONS */}
          <div className="bottom-btn-row">
            <button onClick={() => navigate("/longues")}>
              Back to Spaces
            </button>
            <button onClick={() => navigate("/activities")}>
              My Activities
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default LongueDetails;