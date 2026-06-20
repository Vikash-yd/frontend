 import {
  getSeatsByHall,
  bookSeat,
  unbookSeat,
} from "../services/seatService";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Seat.css";
import hallsData from "../assets/hallData.js";
import "./Books.css";

function Seat() {
  const [selectedHallId, setSelectedHallId] = useState(hallsData[0].id);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [dbSeats, setDbSeats] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const selectedHall = hallsData.find(
    (hall) => hall.id === Number(selectedHallId)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
  const fetchSeats = () => {
    getSeatsByHall(selectedHallId)
      .then((data) => setDbSeats(data))
      .catch((err) => console.error("Failed to load seats:", err));
  };

  fetchSeats();

  const interval = setInterval(() => {
    fetchSeats();
  }, 5000);

  return () => clearInterval(interval);
}, [selectedHallId]);

  // ✅ FIX: correct backend mapping (seatNumber is source of truth)
  const bookedSeatMap = useMemo(() => {
    const map = {};
    dbSeats.forEach((seat) => {
      map[seat.seatNumber] = seat.booked;
    });
    return map;
  }, [dbSeats]);

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
          const leftAvailable = table.leftSeats.filter(
            (seat) => !bookedSeatMap[seat.id]
          ).length;

          const rightAvailable = table.rightSeats.filter(
            (seat) => !bookedSeatMap[seat.id]
          ).length;

          return rowSum + leftAvailable + rightAvailable;
        }, 0)
      );
    }, 0);
  }, [selectedHall, bookedSeatMap]);

  const handleSeatClick = (seatId, available) => {
  if (!available) return;

  setSelectedSeats((prev) => {
    if (prev.includes(seatId)) {
      setPopupMessage(`${seatId} removed`);
      return [];
    }

    if (prev.length >= 1) {
      setPopupMessage("Please select only one seat");
      return prev;
    }

    setPopupMessage(`${seatId} selected`);
    return [seatId];
  });

  setTimeout(() => setPopupMessage(""), 1200);
};

  // ✅ FIXED BOOKING (NO UI CHANGE)
  const handleBooking = async () => {
    try {
      if (!user?.id) {
        alert("Please login first");
        window.location.href = "/login";
        return;
      }

      console.log("USER =", user);
console.log("USER ID =", user?.id);

for (const seatId of selectedSeats) {
  await bookSeat(
    seatId,
    Number(selectedHallId),
    user.id
  );
}

      const updatedSeats = await getSeatsByHall(Number(selectedHallId));

      setDbSeats(updatedSeats);   // 🔥 THIS updates red/available UI
      setSelectedSeats([]);

      alert("Seats booked successfully!");
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.message || "Booking failed!");
    }
  };
  const handleUnbook = async () => {
  try {
    await unbookSeat(user.id);

    const updatedSeats = await getSeatsByHall(
      Number(selectedHallId)
    );

    setDbSeats(updatedSeats);
    setSelectedSeats([]);

    alert("Seat unbooked successfully");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  return (
    <>
      <Navbar />

      <div className="books-page">
        <section className="page-hero">
          <div className="page-hero-overlay">
            <p className="page-subtitle">
              SELECT • RESERVE • STUDY
            </p>

            <h1 className="page-title">
              Reading Hall Seat Booking
            </h1>

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
          <div>
            <span className="legend-box available-seat"></span>
            Available
          </div>
          <div>
            <span className="legend-box booked-seat"></span>
            Booked
          </div>
          <div>
            <span className="legend-box selected-seat"></span>
            Selected
          </div>
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
                              : !bookedSeatMap[seat.id]
                              ? "available-seat"
                              : "booked-seat"
                          }`}
                          onClick={() =>
                            handleSeatClick(seat.id, !bookedSeatMap[seat.id])
                          }
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
                              : !bookedSeatMap[seat.id]
                              ? "available-seat"
                              : "booked-seat"
                          }`}
                          onClick={() =>
                            handleSeatClick(seat.id, !bookedSeatMap[seat.id])
                          }
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

          <button className="book-now-btn" onClick={handleBooking}>
            Book Seat
          </button>
          <button
  className="book-now-btn"
  onClick={handleUnbook}
  style={{ marginLeft: "10px" }}
>
  Unbook Seat
</button>
        </div>
      </div>

      {popupMessage && <div className="seat-popup">{popupMessage}</div>}

      <Footer />
    </>
  );
}

export default Seat;