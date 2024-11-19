import React from "react";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../../utility/api";

const Reservation = ({ reservation }) => {
  const reservation_id = reservation.reservation_id;
  const abortController = new AbortController();
  const navigateTo = useNavigate();

  const twelveHourTime = (reservation_time) => {
    let meridiem = "AM";
    let hours = new Date(`2000-01-01 ${reservation_time}`).getHours();
    let minutes = new Date(`2000-01-01 ${reservation_time}`).getMinutes();

    if (hours - 12 === 0) {
      meridiem = "PM";
    } else if (hours - 12 > 0) {
      hours -= 12;
      meridiem = "PM";
    }

    if (minutes === 0) minutes = "00";

    return `${hours}:${minutes} ${meridiem}`;
  };

  const handleSeatClick = async () => {
    navigateTo(`/reservations/${reservation_id}/seat`);
  };

  const handleCancelClick = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await cancelReservation(
        reservation.reservation_id,
        abortController.signal
      );
      navigateTo(0);
    }
  };

  return (
    <div className="card bg-light border-dark m-4 shadow">
      <div className="card-body">
        <h4 className="card-title text-center">
          {reservation.first_name} {reservation.last_name} - Party of{" "}
          {reservation.people}
        </h4>
        <p className="card-text text-center">
          <strong>Contact:</strong> {reservation.mobile_number}
        </p>
        <p className="card-text text-center">
          <strong>Date:</strong> {reservation.reservation_date}
        </p>
        <p className="card-text text-center">
          <strong>Time:</strong> {twelveHourTime(reservation.reservation_time)}
        </p>
        <p className="card-text text-center">
          <strong>Status: </strong> {reservation.status.toUpperCase()}
        </p>
        {reservation.status === "booked" && (
          <div className="d-flex justify-content-center">
            <button
              type="button"
              onClick={handleSeatClick}
              className="btn btn-success border border-dark shadow mx-2"
            >
              Seat
            </button>
            <button
              type="button"
              className="btn btn-warning border border-dark shadow mx-2"
              onClick={() => navigateTo(`/reservations/${reservation_id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="btn btn-danger border border-dark shadow mx-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
