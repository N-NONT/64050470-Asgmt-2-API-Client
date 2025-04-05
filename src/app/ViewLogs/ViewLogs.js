"use client";
import "../css/globals.css";
import { useState, useEffect } from "react";

export default function ViewLogs() {
  const [droneId, setDroneId] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiEndpoint = process.env.LOG_SERVER_API_ENDPOINT;

  const handleDroneIdChange = (e) => {
    setDroneId(e.target.value);
  };

  const fetchLogs = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(process.env.LOG_SERVER_API_ENDPOINT);
      const data = await response.json();
      setLogs(data.slice(0, 25)); // รับแค่ 25 รายการล่าสุด
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (droneId) {
      fetchLogs(droneId);
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ textAlign: "center" }}>View Logs</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label htmlFor="droneId" style={{ marginRight: "10px" }}>
          Enter Drone ID:
        </label>
        <input
          type="text"
          id="droneId"
          value={droneId}
          onChange={handleDroneIdChange}
          placeholder="Enter Drone ID"
          style={{ padding: "10px", fontSize: "16px", width: "200px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
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
