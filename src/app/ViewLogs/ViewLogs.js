"use client";

import { useState, useEffect } from "react";
import "../css/globals.css";

export default function ViewLogs({ droneIds }) {
  const [droneId, setDroneId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDroneIdChange = (e) => {
    setDroneId(e.target.value);
    if (e.target.value !== "") {
      setSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      setDroneId("");
    }
  };

  const fetchLogs = async (id) => {
    setLoading(true);
    try {
      const baseUrl = process.env.LOG_SERVER_API_ENDPOINT;
      const response = await fetch(`${baseUrl}${id}`);
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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1007) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        marginTop: isSmallScreen ? "80px" : "100px",
        flexDirection: isSmallScreen ? "column" : "row",
      }}
    >
      <div className="card ViewLogs" style={{padding: isSmallScreen ? "10px" : "50px",}}>
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "30px",
            fontSize: isSmallScreen ? "150%" : "250%",
          }}
        >
          View Temperature Logs
        </h1>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent: "flex-end",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <select
                id="droneId"
                value={droneId}
                onChange={handleDroneIdChange}
                disabled={searchTerm !== ""}
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
              >
                <option value="">-- Select Drone ID --</option>
                {droneIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Enter Drone ID"
                disabled={droneId !== ""}
                style={{
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!droneId && !searchTerm}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                borderRadius: "4px",
                border: "none",
                cursor: droneId || searchTerm ? "pointer" : "not-allowed",
              }}
            >
              Search
            </button>
          </div>
        </form>

        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: isSmallScreen ? "30%" : "100%",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            Logs Table
          </h3>
          {loading ? (
            <p style={{ color: "#888" }}>Loading logs...</p>
          ) : (
            <table
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderCollapse: "collapse",
                marginTop: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead>
                <tr>
                  {[
                    "No.",
                    "Created",
                    "Country",
                    "Drone ID",
                    "Drone Name",
                    "Celsius",
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        fontSize: "16px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: isSmallScreen ? "60%" : "100%",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <tr
                      key={log.created}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      }}
                    >
                      <td
                        className="cellStyle"
                        style={{
                          border: "1px solid #ddd",
                          padding: "12px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="cellStyle"
                        title={log.created}
                        style={{ border: "1px solid #ddd", padding: "12px" }}
                      >
                        {log.created}
                      </td>
                      <td
                        className="cellStyle"
                        title={log.country}
                        style={{ border: "1px solid #ddd", padding: "12px" }}
                      >
                        {log.country}
                      </td>
                      <td
                        className="cellStyle"
                        title={log.drone_id}
                        style={{ border: "1px solid #ddd", padding: "12px" }}
                      >
                        {log.drone_id}
                      </td>
                      <td
                        className="cellStyle"
                        title={log.drone_name}
                        style={{ border: "1px solid #ddd", padding: "12px" }}
                      >
                        {log.drone_name}
                      </td>
                      <td
                        className="cellStyle"
                        title={log.celsius}
                        style={{ border: "1px solid #ddd", padding: "12px" }}
                      >
                        {log.celsius}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        textAlign: "center",
                        color: "#888",
                      }}
                    >
                      No logs available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
