import React, { useState } from "react";
import { listReservations } from "../utility/api";
import ReservationList from "../components/reservations/ReservationList";
import ErrorAlert from "../components/errors/ErrorAlert";

const SearchReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [searchingStatus, setSearchingStatus] = useState("");

  const handleChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setReservations([]);
    setSearchingStatus("searching");
    const abortController = new AbortController();
    try {
      const data = await listReservations(
        { last_name: lastName },
        abortController.signal
      );
      setSearchingStatus("complete");
      setReservations(data);
    } catch (error) {
      setSearchingStatus("complete");
      setError(error);
    }

    return abortController.abort();
  };

  return (
    <div>
      <h1 className="text-center display-4 mt-3">Search for a Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="my-5">
        <label className="m-2">Customer's Last Name</label>
        <div className="d-flex">
          <input
            name="mobile_number"
            onChange={handleChange}
            className="form-control shadow"
            type="text"
            placeholder="Enter a customer's last name"
            required
          />
          <button
            type="submit"
            className="btn btn-primary border border-dark mx-2 shadow"
          >
            Search
          </button>
        </div>
      </form>
      <div className="d-flex flex-wrap justify-content-center">
        {searchingStatus === "searching" && (
          <h3 className="text-center">searching...</h3>
        )}
        {reservations.length !== 0 && searchingStatus === "complete" && (
          <ReservationList reservations={reservations} />
        )}
        {reservations.length === 0 && searchingStatus === "complete" && (
          <h3 className="text-center">No reservations found</h3>
        )}
      </div>
    </div>
  );
};

export default SearchReservation;
