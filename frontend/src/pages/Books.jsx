 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  FaBook,
  FaFlask,
  FaBriefcase,
  FaGavel,
  FaGlobe,
  FaFeatherAlt,
  FaHeart,
  FaChild,
} from "react-icons/fa";

function Books() {
  const navigate = useNavigate();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const books = [
    {
      icon: <FaBook />,
      title: "Academic & Educational",
      desc: "Covers school, college, and competitive exam subjects.",
      category: "academic-educational",
    },
    {
      icon: <FaFlask />,
      title: "Science & Technology",
      desc: "Physics, chemistry, biology, and modern innovations.",
      category: "science-technology",
    },
    {
      icon: <FaBriefcase />,
      title: "Business & Economics",
      desc: "Finance, management, and entrepreneurship topics.",
      category: "business-economics",
    },
    {
      icon: <FaGavel />,
      title: "Law & Government",
      desc: "Legal studies and governance systems.",
      category: "law-government",
    },
    {
      icon: <FaGlobe />,
      title: "History & Culture",
      desc: "Explore historical events and cultural heritage.",
      category: "history-culture",
    },
    {
      icon: <FaFeatherAlt />,
      title: "Literature & Classics",
      desc: "Timeless novels, poetry, and literary works.",
      category: "literature-classics",
    },
    {
      icon: <FaHeart />,
      title: "Self-Help & Growth",
      desc: "Improve mindset, productivity, and personal growth.",
      category: "self-help-growth",
    },
    {
      icon: <FaChild />,
      title: "Children’s Books",
      desc: "Learning and fun books for young readers.",
      category: "childrens-books",
    },
  ];

  const handleExplore = (category) => {
    navigate(`/books/category/${category}`);
  };

  return (
    <>
      <Navbar />

      <div className="books-page">
        <section className="page-hero">
          <div className="page-hero-overlay">
            <p className="page-subtitle">READ • LEARN • EXPLORE</p>
            <h1 className="page-title">Book Collection</h1>
            <p className="page-description">
              Discover a wide range of books across multiple domains and expand your knowledge.
            </p>
          </div>
        </section>

        <div className="books-grid">
          {books.map((book, index) => (
            <div className="book-card" key={index}>
              <div className="book-icon">{book.icon}</div>

              <h3>{book.title}</h3>
              <p>{book.desc}</p>

              <button
                className="book-btn"
                onClick={() => handleExplore(book.category)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Books;