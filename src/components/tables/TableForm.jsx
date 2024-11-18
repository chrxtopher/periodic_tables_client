import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../errors/ErrorAlert";
import { createTable } from "../../utility/api";

const TableForm = () => {
  const navigateTo = useNavigate();
  const [error, setError] = useState(null);
  const emptyTable = {
    table_name: "",
    capacity: "",
  };
  const [newTable, setNewTable] = useState({ ...emptyTable });

  const handleChange = (event) => {
    setNewTable({ ...newTable, [event.target.name]: event.target.value });
  };

  const handleNumberChange = (event) => {
    setNewTable({
      ...newTable,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await createTable(newTable, abortController.signal);
      setNewTable({ ...emptyTable });
      navigateTo("/");
    } catch (error) {
      setError(error);
    }

    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="m-5">
        <div className="row">
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="tableName">
              Table Name
            </label>
            <input
              type="text"
              name="table_name"
              className="form-control shadow"
              id="table_name"
              placeholder="Table Name"
              value={newTable.table_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col mb-3">
            <label className="ml-2 mb-1" htmlFor="capacity">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              className="form-control shadow"
              id="capacity"
              placeholder="1"
              min={1}
              value={newTable.capacity}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          <button
            onClick={() => navigateTo(-1)}
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
      </form>
    </>
  );
};

export default TableForm;
