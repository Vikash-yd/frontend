import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LongueDetails.css";

function LongueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/events/lounge/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        console.log("Events:", data);

        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="longue-details-page">
          <div className="details-wrapper">
            <h2>Loading events...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const totalSeatsAvailable = events.reduce(
    (sum, event) => sum + (event.seatsLeft || 0),
    0
  );

  return (
    <>
      <Navbar />

      <div className="longue-details-page">
        <div className="details-wrapper">

          <section className="details-hero-card">
            <div className="details-hero-left">
              <div className="details-hero-content">
                <p className="details-small-label">
                  SMART LIBRARY EXPERIENCE
                </p>

                <h1>Lounge Events</h1>

                <h3>
                  Explore events, workshops and activities available in this lounge
                </h3>

                <p className="details-description">
                  Discover upcoming sessions, reserve your seat, and participate
                  in engaging library experiences.
                </p>
              </div>
            </div>
          </section>

          <section className="details-stats-grid">

            <div className="stat-card">
              <span>Total Events</span>
              <h4>{events.length}</h4>
            </div>

            <div className="stat-card">
              <span>Status</span>
              <h4>Active</h4>
            </div>

            <div className="stat-card">
              <span>Seats Available</span>
              <h4>{totalSeatsAvailable}</h4>
            </div>

            <div className="stat-card">
              <span>Category</span>
              <h4>Lounge Events</h4>
            </div>

          </section>

          <section className="sessions-section">

            <div className="section-top">
              <div>
                <p className="details-small-label">
                  UPCOMING EVENTS
                </p>
                <h2>
                  Select an event that fits your interests
                </h2>
              </div>

              <button
                className="view-activity-btn"
                onClick={() => navigate("/activities")}
              >
                View My Activities
              </button>
            </div>

            <div className="session-grid">

              {events.length === 0 ? (
                <h3>No events available for this lounge.</h3>
              ) : (
                events.map((event) => (
                  <div className="session-card" key={event.id}>

                    <div className="session-card-top">

                      <div>

                        <div className="session-tag-row">
                          {event.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="session-badge"
                            >
                              {tag.replaceAll("_", " ")}
                            </span>
                          ))}
                        </div>

                        <h3>{event.title}</h3>

                      </div>

                      <div className="seat-chip">
                        {event.seatsLeft} Seats Left
                      </div>

                    </div>

                    <p className="session-about">
                      {event.description}
                    </p>

                    <div className="session-info-grid">

                      <div className="info-item">
                        <span>Date</span>
                        <strong>{event.eventDate}</strong>
                      </div>

                      <div className="info-item">
                        <span>Time</span>
                        <strong>{event.eventTime}</strong>
                      </div>

                      <div className="info-item">
                        <span>Host</span>
                        <strong>{event.hostName}</strong>
                      </div>

                      <div className="info-item">
                        <span>Total Seats</span>
                        <strong>{event.totalSeats}</strong>
                      </div>

                    </div>

                    <div className="session-action-row">

                      <button
                        className="select-btn"
                        onClick={() =>
                          navigate(`/event/${event.id}`)
                        }
                      >
                        View Event
                      </button>

                      <button className="outline-btn">
                        Save For Later
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>

          </section>

          <div className="bottom-btn-row">

            <button
              className="outline-btn"
              onClick={() => navigate("/lounges")}
            >
              Back to Lounges
            </button>

            <button
              className="select-btn"
              onClick={() => navigate("/activities")}
            >
              Go to My Activities
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default LongueDetails;