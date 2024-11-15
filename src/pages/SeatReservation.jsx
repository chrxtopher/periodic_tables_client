import React, { useEffect, useState } from "react";
import { listTables, seatReservation } from "../utility/api";
import { useParams, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/errors/ErrorAlert";
import { today } from "../utility/date-time";

const SeatReservation = () => {
  const navigateTo = useNavigate();
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTables = async () => {
      const abortController = new AbortController();
      setError(null);
      try {
        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (error) {
        setError(error);
      }
    };
    loadTables();
  }, []);

  const tableSelectOptions = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const handleChange = (event) => {
    setTable({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatReservation(
        reservation_id,
        Number(table.table_id),
        abortController.signal
      );
      navigateTo(`/dashboard?date=${today()}`);
    } catch (error) {
      setError(error);
    }

    return () => abortController.abort();
  };

  return (
    <>
      <h1 className="display-4 text-center mt-3 mb-5">Seat a Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <div className="mx-5">
          <label className="ml-2 mb-1" htmlFor="firstName">
            Table number
          </label>
          <select
            required
            onChange={handleChange}
            name="table_id"
            className="form-control"
          >
            <option value=""></option>
            {tableSelectOptions}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button
              onClick={() => navigateTo("/dashboard")}
              className="btn btn-lg btn-danger border border-dark mx-2 shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-lg btn-primary border border-dark mx-2 shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SeatReservation;
