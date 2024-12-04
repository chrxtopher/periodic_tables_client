import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearTable, deleteTable } from "../../utility/api";
import ErrorAlert from "../errors/ErrorAlert";

const Table = ({ table }) => {
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const status = table.reservation_id ? "occupied" : "open";

  const handleClearTable = async (table_id, reservation_id) => {
    if (window.confirm("Confirm this table is ready to seat new guests")) {
      try {
        await clearTable(table_id, reservation_id);
        navigateTo(0);
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleDeleteTable = async (table_id) => {
    if (
      window.confirm(
        "Confirm the deletion of this table, this can not be undone."
      )
    ) {
      try {
        await deleteTable(table_id);
        navigateTo(0);
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <div className="card bg-light border-dark m-4 shadow">
        <div className="card-body">
          <h4 className="card-title text-center">{table.table_name}</h4>
          <p className="card-text text-center">
            <strong>Capacity:</strong> {table.capacity}
          </p>
          <p className="text-center">{status.toUpperCase()}</p>
          <div className="d-flex justify-content-center">
            {table.reservation_id && (
              <button
                type="button"
                onClick={() =>
                  handleClearTable(table.table_id, table.reservation_id)
                }
                className="btn btn-primary border border-dark shadow"
              >
                Clear
              </button>
            )}
            {!table.reservation_id && (
              <button
                type="button"
                onClick={() => handleDeleteTable(table.table_id)}
                className="btn btn-danger border border-dark shadow"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
