import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetails() {

  const { id } = useParams();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);

  const [bookingId, setBookingId] = useState("");

  useEffect(() => {

    const fetchBook = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/api/categories/book/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();

        setBook(data);

      } catch (error) {

        console.error("Error fetching book:", error);

      } finally {

        setLoading(false);
      }
    };

    fetchBook();

  }, [id]);

  // GENERATE RANDOM BOOKING ID
  const handleGrabBook = () => {

    const randomId =
      "BOOK-" +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    setBookingId(randomId);

    setShowPopup(true);
  };

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="book-details-page">
          <h2 className="not-found">
            Loading book details...
          </h2>
        </div>

        <Footer />
      </>
    );
  }

  if (!book) {

    return (
      <>
        <Navbar />

        <div className="book-details-page">
          <h2 className="not-found">
            Book not found.
          </h2>
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
              src={book.coverImageUrl}
              alt={book.title}
              className="details-image"
            />

          </div>

          <div className="details-content">

            <h1>{book.title}</h1>

            <p className="book-description">
              {book.description}
            </p>

            <div className="details-grid">

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>

              <p>
                <strong>Published Date:</strong> {book.publishedDate}
              </p>

              <p>
                <strong>Category:</strong> {book.category}
              </p>

              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>

              <p>
                <strong>Language:</strong> {book.language}
              </p>

              <p>
                <strong>Pages:</strong> {book.pageCount}
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {book.rating}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {book.availableCopies > 0
                  ? "Available"
                  : "Not Available"}
              </p>

              <p
                className={
                  book.availableCopies < 10
                    ? "stock-count low-stock"
                    : "stock-count"
                }
              >
                <strong>
                  Books Available in Library:
                </strong>{" "}
                {book.availableCopies}

                {book.availableCopies < 10 &&
                  " (Low Stock)"}
              </p>

            </div>

            {/* BUTTON */}
            <button
              className="grab-book-btn"
              onClick={handleGrabBook}
            >
              Grab This Book
            </button>

          </div>

        </div>

      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-card">

            <h2>Book Successfully Booked 🎉</h2>

            <p>
              Your booking has been confirmed.
            </p>

            <div className="booking-id">
              Booking ID: {bookingId}
            </div>

            <button
              className="close-popup-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
}

export default BookDetails;