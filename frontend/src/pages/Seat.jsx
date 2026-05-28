  import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Seat.css";
import hallsData from "../assets/hallData.js";
import "./Books.css";
import { useEffect } from "react";

function Seat() {
  const [selectedHallId, setSelectedHallId] = useState(hallsData[0].id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

  const selectedHall = hallsData.find(
    (hall) => hall.id === Number(selectedHallId)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalSeats = useMemo(() => {
    return selectedHall.rows.reduce((sum, row) => {
      return (
        sum +
        row.tables.reduce((rowSum, table) => {
          return rowSum + table.leftSeats.length + table.rightSeats.length;
        }, 0)
      );
    }, 0);
  }, [selectedHall]);

  const availableSeats = useMemo(() => {
    return selectedHall.rows.reduce((sum, row) => {
      return (
        sum +
        row.tables.reduce((rowSum, table) => {
          const leftAvailable = table.leftSeats.filter((seat) => seat.available).length;
          const rightAvailable = table.rightSeats.filter((seat) => seat.available).length;
          return rowSum + leftAvailable + rightAvailable;
        }, 0)
      );
    }, 0);
  }, [selectedHall]);

  const handleSeatClick = (seatId, available) => {
    if (!available) return;

    let message = "";
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
      message = `${seatId} removed`;
    } else {
      setSelectedSeats((prev) => [...prev, seatId]);
      message = `${seatId} selected successfully`;
    }

    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 1500);
  };

   return (
  <>
    <Navbar />

    <div className="books-page">
      <section className="page-hero">
        <div className="page-hero-overlay">
          <p className="page-subtitle">SELECT • RESERVE • STUDY</p>
          <h1 className="page-title">Reading Hall Seat Booking</h1>
          <p className="page-description">
            Choose a hall and book a seat from a library-style arrangement.
          </p>
        </div>
      </section>

      <div className="hall-controls-box">
        <div className="control-group centered-control">
          <label htmlFor="hall">Choose Hall</label>
          <select
            id="hall"
            value={selectedHallId}
            onChange={(e) => {
              setSelectedHallId(e.target.value);
              setSelectedSeats([]);
            }}
          >
            {hallsData.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hall-stats">
          <div className="stat-card">
            <span className="stat-label">Rows</span>
            <strong>{selectedHall.rows.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Seats</span>
            <strong>{totalSeats}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Available</span>
            <strong>{availableSeats}</strong>
          </div>
        </div>
      </div>

      <div className="legend-row">
        <div><span className="legend-box available-seat"></span> Available</div>
        <div><span className="legend-box booked-seat"></span> Booked</div>
        <div><span className="legend-box selected-seat"></span> Selected</div>
      </div>

      <div className="hall-layout-box">
        <div className="gate-row">
          <div className="gate gate-entry">ENTRY</div>
          <div className="aisle-label">Central Study Aisle</div>
          <div className="gate gate-exit">EXIT</div>
        </div>

        <div className="library-floor">
          {selectedHall.rows.map((row) => (
            <div className="hall-row" key={row.rowNo}>
              {row.tables.map((table, tableIndex) => (
                <div className="study-table-block" key={table.tableId}>
                  
                  <div className="seat-column left-column">
                    {table.leftSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={`chair-seat ${
                          selectedSeats.includes(seat.id)
                            ? "selected-seat"
                            : seat.available
                            ? "available-seat"
                            : "booked-seat"
                        }`}
                        onClick={() => handleSeatClick(seat.id, seat.available)}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>

                  <div className="table-rectangle">
                    <span>Table {tableIndex + 1}</span>
                  </div>

                  <div className="seat-column right-column">
                    {table.rightSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={`chair-seat ${
                          selectedSeats.includes(seat.id)
                            ? "selected-seat"
                            : seat.available
                            ? "available-seat"
                            : "booked-seat"
                        }`}
                        onClick={() => handleSeatClick(seat.id, seat.available)}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="booking-summary-box">
        <h3>Selected Seats</h3>
        <p>
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "No seat selected yet."}
        </p>
        <button className="book-now-btn">Book Now</button>
      </div>
    </div>

    {/* ✅ Popup OUTSIDE main div */}
    {popupMessage && <div className="seat-popup">{popupMessage}</div>}

    <Footer />
  </>
  );
}

export default Seat;
