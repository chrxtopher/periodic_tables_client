import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { listReservations, listTables } from "../utility/api";
import { today, previous, next } from "../utility/date-time";
import ErrorAlert from "../components/errors/ErrorAlert";
import ReservationsList from "../components/reservations/ReservationList";

const Dashboard = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const navigateTo = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  const loadDashboard = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  const loadTables = () => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  };

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  useEffect(() => {
    navigateTo(`/dashboard?date=${date}`);
  }, [date, navigateTo]);

  return (
    <main>
      <h1 className="display-4 text-center mt-3 mb-5">Dashboard</h1>
      <h3 className="text-center">Reservations for date:</h3>
      <h3 className="text-center">{date}</h3>
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn-lg btn-primary border border-dark mx-2 shadow"
          onClick={() => setDate(previous(date))}
        >
          Previous
        </button>
        <button
          className="btn-lg btn-warning border border-dark mx-2 shadow"
          onClick={() => setDate(today())}
        >
          Today
        </button>
        <button
          className="btn-lg btn-primary border border-dark mx-2 shadow"
          onClick={() => setDate(next(date))}
        >
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <section className="d-flex flex-wrap justify-content-center">
        <ReservationsList reservations={reservations} />
      </section>
      <ErrorAlert error={tablesError} />
      <h3 className="text-center my-4">Tables</h3>
      <section className="d-flex flex-wrap justify-content-center">
        {tables &&
          tables.map((table) => {
            return <TablesList key={table.table_id} table={table} />;
          })}
      </section>
    </main>
  );
};

export default Dashboard;
