import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./CategoryBooks.css";
import { useParams, useNavigate } from "react-router-dom";
import booksData from "../assets/bookData.js";

function CategoryBooks() {
  const { category } = useParams();
  const navigate = useNavigate();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const filteredBooks = booksData.filter((book) => book.category === category);

  const formatCategoryTitle = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Navbar />

      <div className="category-books-page">
        <div className="category-header">
          <h1>{formatCategoryTitle(category)}</h1>
          <p>Browse books available in this category.</p>
        </div>

        <div className="category-books-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="book-row" key={book.id}>
                <div className="book-left">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-img"
                  />
                </div>

                <div className="book-main">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-subtext">
                    <span>Publisher: {book.publisher}</span>
                    <span>Rating: ⭐ {book.rating}</span>
                  </p>
                </div>

                <div className="book-action">
                  <button
                    className="details-btn"
                    onClick={() => navigate(`/books/details/${book.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-books">No books available in this category.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CategoryBooks;