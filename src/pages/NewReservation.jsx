import React from "react";
import ReservationForm from "../components/reservations/ReservationForm";

const NewReservation = () => {
  return (
    <div>
      <h1 className="text-center display-4 mt-3">Create a Reservation</h1>
      <ReservationForm />
    </div>
  );
};

export default NewReservation;
