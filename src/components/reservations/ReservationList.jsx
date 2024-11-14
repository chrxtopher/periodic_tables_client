import React from "react";
import Reservation from "./Reservation";
import NoReservations from "./NoReservations";

const ReservationList = ({ reservations }) => {
  if (reservations.length <= 0) {
    return <NoReservations />;
  } else {
    return (
      <div className="d-flex flex-wrap">
        {reservations.map((reservation) => (
          <Reservation
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </div>
    );
  }
};

export default ReservationList;
