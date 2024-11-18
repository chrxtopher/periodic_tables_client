import React, { useState, useEffect } from "react";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../../utility/api";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "../errors/ErrorAlert";

const emptyReservationForm = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
};

const ReservationForm = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({ ...emptyReservationForm });
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function checkForReservation() {
      try {
        if (reservation_id) {
          const data = await readReservation(
            reservation_id,
            abortController.signal
          );
          setFormData(data);
        } else {
          setFormData({ ...emptyReservationForm });
        }
      } catch (error) {
        setError(error);
      }
    }
    checkForReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePeopleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      if (reservation_id) {
        await updateReservation(formData, abortController.signal);
        setFormData({ ...emptyReservationForm });
        navigateTo(`/dashboard?date=${formData.reservation_date}`);
      } else {
        await createReservation(formData, abortController.signal);
        setFormData({ ...emptyReservationForm });
        navigateTo(`/dashboard?date=${formData.reservation_date}`);
      }
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="m-5">
        <div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                name="first_name"
                onChange={handleChange}
                className="form-control shadow"
                type="text"
                value={formData.first_name}
                placeholder="First Name"
                required
              />
            </div>
            <div className="col mb-3">
              <label className="ml-2 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="last_name"
                onChange={handleChange}
                className="form-control shadow"
                type="text"
                value={formData.last_name}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2 mb-1" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                name="mobile_number"
                onChange={handleChange}
                className="form-control shadow"
                type="text"
                value={formData.mobile_number}
                placeholder="xxx-xxx-xxxx"
                required
              />
            </div>
            <div className="col mb-3">
              <label className="ml-2" htmlFor="partySize">
                Party Size
              </label>
              <input
                name="people"
                onChange={handlePeopleChange}
                className="form-control shadow"
                type="number"
                min={1}
                value={formData.people}
                placeholder="1"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col mb-3">
              <label className="ml-2" htmlFor="reservationDate">
                Date of Reservation
              </label>
              <input
                name="reservation_date"
                onChange={handleChange}
                className="form-control shadow"
                type="date"
                value={formData.reservation_date}
                required
              />
            </div>
            <div className="col mb-3">
              <label className="ml-2" htmlFor="reservationTime">
                Time of Reservation
              </label>
              <input
                name="reservation_time"
                onChange={handleChange}
                className="form-control shadow"
                type="time"
                value={formData.reservation_time}
                required
              />
              <small className="m-2">Between 10:30 AM - 9:30 PM</small>
            </div>
          </div>
        </div>
        <div className="d-flex my-4 justify-content-center">
          <button
            className="btn btn-danger btn-lg border border-dark mx-2 shadow"
            onClick={() => navigateTo(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg border border-dark mx-2 shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
