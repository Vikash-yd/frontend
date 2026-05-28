 import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LongueDetails.css";
import { useEffect } from "react";

function LongueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageData = useMemo(
    () => ({
      "discussion-room": {
        icon: "💬",
        title: "Discussion Room",
        subtitle: "Interactive conversations, doubt solving, and peer learning",
        description:
          "Join engaging academic discussions, share ideas, ask doubts, and connect with learners in a vibrant collaborative environment.",
        stats: {
          timing: "9:00 AM - 7:00 PM",
          location: "Block A, Collaboration Wing",
          capacity: "40 seats",
          format: "Live guided discussions",
        },
        sessions: [
          {
            title: "Open Discussion on Literature & Society",
            date: "2 April 2026",
            time: "11:00 AM - 12:00 PM",
            host: "Dr. Meera Sharma",
            venue: "Hall A - Discussion Arena",
            seats: "12 seats left",
            level: "Open for All",
            tag: "Popular",
            about:
              "A guided discussion where students share views on literature, society, and contemporary ideas.",
          },
          {
            title: "Career Q&A Student Circle",
            date: "3 April 2026",
            time: "3:00 PM - 4:00 PM",
            host: "Placement Support Team",
            venue: "Seminar Corner 2",
            seats: "8 seats left",
            level: "Beginner Friendly",
            tag: "Live",
            about:
              "An interactive session focused on careers, higher studies, internships, and preparation.",
          },
          {
            title: "Public Speaking Confidence Session",
            date: "5 April 2026",
            time: "1:00 PM - 2:00 PM",
            host: "Communication Club",
            venue: "Expression Room",
            seats: "15 seats left",
            level: "Intermediate",
            tag: "Trending",
            about:
              "Build speaking confidence through structured academic discussion rounds.",
          },
        ],
      },

      "reading-zone": {
        icon: "📚",
        title: "Reading Zone",
        subtitle: "Silence, peace, and deep reading experience",
        description:
          "A calm and distraction-free area for silent reading, self-study, revision, and peaceful focus in a premium library setting.",
        stats: {
          timing: "8:00 AM - 9:00 PM",
          location: "Central Reading Wing",
          capacity: "60 seats",
          format: "Silent academic zone",
        },
        sessions: [
          {
            title: "Morning Silent Reading Session",
            date: "2 April 2026",
            time: "9:00 AM - 11:00 AM",
            host: "Library Reading Club",
            venue: "Reading Hall 1",
            seats: "20 seats left",
            level: "Open for All",
            tag: "Recommended",
            about:
              "A peaceful reading session for students who want uninterrupted morning focus.",
          },
          {
            title: "Exam Revision Reading Slot",
            date: "3 April 2026",
            time: "2:00 PM - 4:00 PM",
            host: "Academic Support Team",
            venue: "Quiet Room 3",
            seats: "14 seats left",
            level: "Exam Focus",
            tag: "High Demand",
            about:
              "Reserved reading slot for focused exam preparation in a silent environment.",
          },
          {
            title: "Evening Deep Study Hour",
            date: "4 April 2026",
            time: "5:30 PM - 7:00 PM",
            host: "Library Faculty Desk",
            venue: "Premium Reading Bay",
            seats: "10 seats left",
            level: "Focused Learners",
            tag: "Limited",
            about:
              "A premium evening session for students who enjoy deep study and individual concentration.",
          },
        ],
      },

      "group-study": {
        icon: "👥",
        title: "Group Study",
        subtitle: "Collaborative learning and shared academic growth",
        description:
          "Perfect for teamwork, topic revision, group assignments, and peer learning with structured collaboration.",
        stats: {
          timing: "10:00 AM - 8:00 PM",
          location: "Collaborative Tables Section",
          capacity: "32 seats",
          format: "Table-based group sessions",
        },
        sessions: [
          {
            title: "Math Revision Circle",
            date: "3 April 2026",
            time: "1:00 PM - 2:30 PM",
            host: "Student Mentor Riya",
            venue: "Study Cluster 4",
            seats: "6 seats left",
            level: "Intermediate",
            tag: "Popular",
            about:
              "Work through revision problems with peers in a structured collaborative setting.",
          },
          {
            title: "Science Problem Solving Group",
            date: "4 April 2026",
            time: "11:00 AM - 12:30 PM",
            host: "Faculty Assistant Team",
            venue: "Group Room 2",
            seats: "11 seats left",
            level: "Beginner Friendly",
            tag: "Live",
            about:
              "A guided problem-solving session for science learners who want interactive revision.",
          },
          {
            title: "Assignment Collaboration Hour",
            date: "6 April 2026",
            time: "4:00 PM - 5:30 PM",
            host: "Academic Peer Leaders",
            venue: "Discussion Table Bay",
            seats: "9 seats left",
            level: "Open for All",
            tag: "Useful",
            about:
              "Bring your assignment and collaborate with peers in a productive study environment.",
          },
        ],
      },

      "brainstorm-hub": {
        icon: "🧠",
        title: "Brainstorm Hub",
        subtitle: "Creative thinking, innovation, and project ideation",
        description:
          "A creative zone for idea generation, startup discussions, project planning, design thinking, and innovation.",
        stats: {
          timing: "11:00 AM - 7:00 PM",
          location: "Innovation Studio Wing",
          capacity: "25 seats",
          format: "Creative ideation sessions",
        },
        sessions: [
          {
            title: "Startup Idea Jam",
            date: "4 April 2026",
            time: "2:00 PM - 3:30 PM",
            host: "Innovation Cell",
            venue: "Innovation Studio",
            seats: "9 seats left",
            level: "Open for All",
            tag: "Trending",
            about:
              "Share startup thoughts, discuss problems, and explore new ideas with creative peers.",
          },
          {
            title: "Creative Project Pitch Session",
            date: "5 April 2026",
            time: "12:00 PM - 1:30 PM",
            host: "Prof. Arjun Malhotra",
            venue: "Brainstorm Arena",
            seats: "7 seats left",
            level: "Intermediate",
            tag: "Mentor-led",
            about:
              "Pitch your project idea and receive suggestions to refine it into something stronger.",
          },
          {
            title: "Design Thinking Mini Lab",
            date: "7 April 2026",
            time: "3:00 PM - 4:15 PM",
            host: "Creative Learning Team",
            venue: "Idea Table 1",
            seats: "13 seats left",
            level: "Beginner Friendly",
            tag: "Workshop",
            about:
              "Learn how to structure raw ideas into usable solutions through design thinking activities.",
          },
        ],
      },

      "focus-pods": {
        icon: "🎯",
        title: "Focus Pods",
        subtitle: "Private concentration spaces for serious productivity",
        description:
          "Reserved corners designed for intense study, coding, writing, revision, and distraction-free work.",
        stats: {
          timing: "9:00 AM - 9:00 PM",
          location: "Focus Wing - Level 2",
          capacity: "18 pods",
          format: "Private productivity slots",
        },
        sessions: [
          {
            title: "2-Hour Focus Slot",
            date: "2 April 2026",
            time: "1:00 PM - 3:00 PM",
            host: "Automated Pod Booking",
            venue: "Pod 5",
            seats: "Pod available",
            level: "Silent Mode",
            tag: "Best Choice",
            about:
              "A structured focus slot ideal for coding, revision, writing, and uninterrupted work.",
          },
          {
            title: "Evening Productivity Session",
            date: "2 April 2026",
            time: "6:00 PM - 8:00 PM",
            host: "Automated Pod Booking",
            venue: "Pod 8",
            seats: "Pod available",
            level: "Deep Work",
            tag: "Premium",
            about:
              "A quiet evening pod session designed for high concentration and output-focused work.",
          },
          {
            title: "Morning Solo Study Booking",
            date: "3 April 2026",
            time: "8:30 AM - 10:30 AM",
            host: "Pod Management System",
            venue: "Pod 3",
            seats: "Pod available",
            level: "Individual Focus",
            tag: "Calm",
            about:
              "Start your day with a private study booking for full attention and personal productivity.",
          },
        ],
      },

      "relax-corner": {
        icon: "☕",
        title: "Relax Corner",
        subtitle: "Refresh, unwind, and return with better energy",
        description:
          "A comfortable place to recharge between academic sessions with light conversation, mindfulness, and stress relief.",
        stats: {
          timing: "9:00 AM - 7:00 PM",
          location: "Wellness Lounge Area",
          capacity: "30 seats",
          format: "Light break sessions",
        },
        sessions: [
          {
            title: "Tea & Unwind Break",
            date: "2 April 2026",
            time: "4:00 PM - 4:30 PM",
            host: "Student Wellness Team",
            venue: "Relax Lounge",
            seats: "18 seats left",
            level: "Open for All",
            tag: "Refreshing",
            about:
              "Take a short mindful break and reset your energy in a calm environment.",
          },
          {
            title: "Mind Refresh Session",
            date: "5 April 2026",
            time: "11:30 AM - 12:00 PM",
            host: "Campus Wellness Mentor",
            venue: "Corner Café Space",
            seats: "14 seats left",
            level: "Calm Session",
            tag: "Wellness",
            about:
              "A short guided session for relaxation and stress release between study hours.",
          },
          {
            title: "Light Conversation Circle",
            date: "6 April 2026",
            time: "3:30 PM - 4:15 PM",
            host: "Community Lounge Team",
            venue: "Comfort Bay",
            seats: "16 seats left",
            level: "Friendly",
            tag: "Social",
            about:
              "A comfortable conversation circle where students relax, connect, and recharge.",
          },
        ],
      },
    }),
    []
  );

  const currentPage = pageData[id];

  if (!currentPage) {
    return (
      <>
        <Navbar />
        <div className="longue-details-page">
          <div className="details-wrapper">
            <div className="not-found-box">
              <h1>Page not found</h1>
              <p>The selected space could not be found.</p>
              <button onClick={() => navigate("/longues")}>Back to Longues</button>
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

      <div className="longue-details-page">
        <div className="details-wrapper">
           <section className="details-hero-card">
  <div className="details-hero-left">
    <div className="details-hero-content">
      <p className="details-small-label">SMART LIBRARY EXPERIENCE</p>
      <h1>{currentPage.title}</h1>
      <h3>{currentPage.subtitle}</h3>
      <p className="details-description">{currentPage.description}</p>
    </div>
  </div>
</section>

          <section className="details-stats-grid">
            <div className="stat-card">
              <span>Available Timing</span>
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

          <section className="sessions-section">
            <div className="section-top">
              <div>
                <p className="details-small-label">UPCOMING SESSIONS</p>
                <h2>Select a session that fits your schedule</h2>
              </div>
              <button className="view-activity-btn" onClick={() => navigate("/activities")}>
                View My Activities
              </button>
            </div>

            <div className="session-grid">
              {currentPage.sessions.map((session, index) => (
                <div className="session-card" key={index}>
                  <div className="session-card-top">
                    <div>
                      <div className="session-tag-row">
                        <span className="session-badge">{session.tag}</span>
                        <span className="session-level">{session.level}</span>
                      </div>
                      <h3>{session.title}</h3>
                    </div>
                    <div className="seat-chip">{session.seats}</div>
                  </div>

                  <p className="session-about">{session.about}</p>

                  <div className="session-info-grid">
                    <div className="info-item">
                      <span>Date</span>
                      <strong>{session.date}</strong>
                    </div>
                    <div className="info-item">
                      <span>Time</span>
                      <strong>{session.time}</strong>
                    </div>
                    <div className="info-item">
                      <span>Host</span>
                      <strong>{session.host}</strong>
                    </div>
                    <div className="info-item">
                      <span>Venue</span>
                      <strong>{session.venue}</strong>
                    </div>
                  </div>

                  <div className="session-action-row">
                    <button className="select-btn">Select Session</button>
                    <button className="outline-btn">Save for Later</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bottom-btn-row">
            <button className="outline-btn" onClick={() => navigate("/longues")}>
              Back to Spaces
            </button>
            <button className="select-btn" onClick={() => navigate("/activities")}>
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
