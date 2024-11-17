import React from "react";
import ReservationForm from "../components/reservations/ReservationForm";

const NewReservation = ({ updating }) => {
  return (
    <div>
      <h1 className="text-center display-4 mt-3">{`${
        updating ? "Update" : "Create"
      } Reservation`}</h1>
      <ReservationForm />
    </div>
  );
};

export default NewReservation;
