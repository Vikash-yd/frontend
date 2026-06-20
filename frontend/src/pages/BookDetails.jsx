 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookDetails.css";
import { useParams } from "react-router-dom";
import booksData from "../assets/bookData.js";
import { useEffect } from "react";

function BookDetails() {
  const { id } = useParams();
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const book = booksData.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="book-details-page">
          <h2 className="not-found">Book not found.</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="book-details-page">
        <div className="book-details-card">
          <div className="details-image-section">
            <img
              src={book.coverImage}
              alt={book.title}
              className="details-image"
            />
          </div>

          <div className="details-content">
            <h1>{book.title}</h1>
            <p className="book-description">{book.description}</p>

            <div className="details-grid">
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Published Year:</strong> {book.publishedYear}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Language:</strong> {book.language}</p>
              <p><strong>Pages:</strong> {book.pages}</p>
              <p><strong>Rating:</strong> ⭐ {book.rating}</p>
              <p><strong>Status:</strong> {book.available ? "Available" : "Not Available"}</p>

               <p
  className={
    book.availableCount < 10 ? "stock-count low-stock" : "stock-count"
  }
>
  <strong>Books Available in Library:</strong> {book.availableCount}
  {book.availableCount < 10 && " (Low Stock)"}
</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookDetails;