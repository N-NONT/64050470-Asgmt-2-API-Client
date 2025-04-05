"use client";

import { useState } from "react";
import "../css/globals.css";

export default function ViewLogs({ droneIds }) {
  const [droneId, setDroneId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDroneIdChange = (e) => {
    setDroneId(e.target.value);
    if (e.target.value !== "") {
      setSearchTerm(""); // disable search input
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      setDroneId(""); // disable droneId select
    }
  };

  const fetchLogs = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://assignment1-470-371682635124.asia-southeast1.run.app/logs/${id}`
      );
      const data = await response.json();
      setLogs(data.slice(0, 25));
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idToFetch = droneId || searchTerm;
    if (idToFetch) {
      fetchLogs(idToFetch);
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ textAlign: "center" }}>View Logs</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", textAlign: "center" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="droneId" style={{ marginRight: "10px" }}>
            Select Drone ID:
          </label>
          <select
            id="droneId"
            value={droneId}
            onChange={handleDroneIdChange}
            disabled={searchTerm !== ""}
            style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
          >
            <option value="">-- Select Drone ID --</option>
            {droneIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="search" style={{ marginRight: "10px" }}>
            Or Search:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter Drone ID"
            disabled={droneId !== ""}
            style={{ padding: "10px", fontSize: "16px", width: "200px", marginRight: "10px" }}
          />
        </div>

        <button
          type="submit"
          disabled={!droneId && !searchTerm}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: (droneId || searchTerm) ? "pointer" : "not-allowed",
          }}
        >
          Fetch Logs
        </button>
      </form>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <div className="viewlogs-wrapper">
          <div className="card ViewLogs">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Created</th>
                    <th>Country</th>
                    <th>Drone ID</th>
                    <th>Drone Name</th>
                    <th>Celsius</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={log.created}>
                        <td>{index + 1}</td>
                        <td>{log.created}</td>
                        <td>{log.country}</td>
                        <td>{log.drone_id}</td>
                        <td>{log.drone_name}</td>
                        <td>{log.celsius}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No logs available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
