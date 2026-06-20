const API_URL = "http://localhost:8080";

const handleResponse = async (response) => {
  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : null) ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};

// ---------------------
// GET SEATS BY HALL
// ---------------------
export const getSeatsByHall = async (hallId) => {
  const response = await fetch(
    `${API_URL}/seats/hall/${hallId}`
  );

  return handleResponse(response);
};

// ---------------------
// SINGLE SEAT BOOK (still kept for fallback)
// ---------------------
 export const bookSeat = async (
  seatNumber,
  hallId,
  userId
) => {
  const response = await fetch(
    `${API_URL}/seats/book?seatNumber=${seatNumber}&hallId=${hallId}&userId=${userId}`,
    {
      method: "POST",
    }
  );

  return handleResponse(response);
};

export const unbookSeat = async (userId) => {
  const response = await fetch(
    `${API_URL}/seats/unbook?userId=${userId}`,
    {
      method: "POST",
    }
  );

  return handleResponse(response);
};