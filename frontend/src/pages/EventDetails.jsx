import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  window.scrollTo(0, 0);

  // // TEMPORARY DEBUG
  // console.log("TOKEN =>", localStorage.getItem("token"));
  // console.log("USER =>", localStorage.getItem("user"));
  // console.log("AUTH =>", localStorage.getItem("auth"));
  // console.log("ALL STORAGE =>", { ...localStorage });

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/events/${id}`
      );

      const data = await response.json();

      setEvent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchEvent();
}, [id]);
 const handleRegister = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to register for this event.");
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(user);

    alert(
      `Successfully registered for "${event.title}" as ${loggedInUser.name}`
    );
  };

  const handleSaveEvent = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first to save this event.");
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(user);

    alert(
      `"${event.title}" has been saved by ${loggedInUser.name}`
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="event-details-page">
          <div className="event-wrapper">
            <h2>Loading Event...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="event-details-page">
          <div className="event-wrapper">
            <div className="event-not-found">
              <h1>Event Not Found</h1>
              <button onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="event-details-page">
        <div className="event-wrapper">

          <section className="event-hero-card">

            <div className="event-badges">

              <span className="status-badge">
                {event.status}
              </span>

              {event.featured && (
                <span className="featured-badge">
                  FEATURED
                </span>
              )}

            </div>

            <h1>{event.title}</h1>

            <p className="event-description">
              {event.description}
            </p>

            <div className="event-hero-grid">

              <div>
                <span>Date</span>
                <strong>{event.eventDate}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{event.eventTime}</strong>
              </div>

              <div>
                <span>Venue</span>
                <strong>{event.venueName}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{event.durationMinutes} mins</strong>
              </div>

            </div>

          </section>

          <section className="details-grid">

            <div className="detail-card">
              <h3>Host Information</h3>

              <div className="detail-item">
                <span>Name</span>
                <strong>{event.hostName}</strong>
              </div>

              <div className="detail-item">
                <span>Qualification</span>
                <strong>{event.hostQualification}</strong>
              </div>

              <div className="detail-item">
                <span>Designation</span>
                <strong>{event.hostDesignation}</strong>
              </div>

              <div className="detail-item">
                <span>Organization</span>
                <strong>{event.hostOrganization}</strong>
              </div>
            </div>

            <div className="detail-card">
              <h3>Venue Details</h3>

              <div className="detail-item">
                <span>Venue Name</span>
                <strong>{event.venueName}</strong>
              </div>

              <div className="detail-item">
                <span>Address</span>
                <strong>{event.venueAddress}</strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>{event.contactEmail}</strong>
              </div>
            </div>

            <div className="detail-card">
              <h3>Event Statistics</h3>

              <div className="detail-item">
                <span>Total Seats</span>
                <strong>{event.totalSeats}</strong>
              </div>

              <div className="detail-item">
                <span>Seats Left</span>
                <strong>{event.seatsLeft}</strong>
              </div>

              <div className="detail-item">
                <span>Registrations</span>
                <strong>{event.registrations}</strong>
              </div>

              <div className="detail-item">
                <span>Views</span>
                <strong>{event.views}</strong>
              </div>

              <div className="detail-item">
                <span>Rating</span>
                <strong>{event.rating} ⭐</strong>
              </div>
            </div>

          </section>

          <section className="content-card">
            <h2>What You'll Learn</h2>
            <p>{event.whatYouWillLearn}</p>
          </section>

          <section className="content-card">
            <h2>Prerequisites</h2>
            <p>{event.prerequisites}</p>
          </section>

          <section className="content-card">
            <h2>Tags</h2>

            <div className="tag-row">
              {event.tags?.map((tag) => (
                <span className="event-tag" key={tag}>
                  {tag.replaceAll("_", " ")}
                </span>
              ))}
            </div>
          </section>

          <div className="action-row">

            <button
  className="register-btn"
  onClick={handleRegister}
>
  Register Now
</button>

<button
  className="save-btn"
  onClick={handleSaveEvent}
>
  Save Event
</button>

<button
  className="save-btn"
  onClick={() => navigate(-1)}
>
  Back
</button>

            <button
              className="save-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default EventDetails;