"use client";

import { useState, useEffect } from "react";
import { fetchDroneData } from "../services/fetchDroneData";

export default function DroneForm({ droneIds }) {
  const [droneData, setDroneData] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState("");
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [celsius, setCelsius] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submittedPayload, setSubmittedPayload] = useState(null);

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

  const formatValue = (value) =>
    value === "Error" || value === "N/A" ? "Loading..." : value;

  useEffect(() => {
    const cached = localStorage.getItem("droneData");
    if (cached) {
      const parsed = JSON.parse(cached);
      setDroneData(parsed);
      setSelectedDroneId(parsed[0]?.drone_id || "");
      setSelectedDroneData(parsed[0] || null);
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const data = await fetchDroneData(droneIds);
        console.log("Drone Data:", data);
        setDroneData(data);
        localStorage.setItem("droneData", JSON.stringify(data));
        if (data.length > 0) {
          setSelectedDroneId(data[0].drone_id);
          setSelectedDroneData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching drone data:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchData, 0);
  }, [droneIds]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDroneId(selectedId);
    const selectedData = droneData.find(
      (drone) => drone.drone_id.toString() === selectedId
    );
    setSelectedDroneData(selectedData || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDroneData || !celsius) {
      setSubmitStatus("Please fill in all fields.");
      return;
    }

    const payload = {
      drone_id: selectedDroneData.drone_id,
      drone_name: selectedDroneData.drone_name,
      country: selectedDroneData.country,
      celsius: Number(celsius),
    };

    try {
      const res = await fetch(process.env.LOG_SERVER_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("✅ Data submitted successfully.");
        setCelsius("");
        setSubmittedPayload(payload);
      } else {
        setSubmitStatus("❌ Failed to submit data.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("❌ Error during submission.");
    }
  };

  return (
    <div style={{ marginTop: isSmallScreen ? "80px" : "100px" }}>
      <div
        className="card Temp"
        style={{
          height: isSmallScreen ? "auto" : "100%",
          padding: isSmallScreen ? "10px" : "50px",
        }}
      >
        <div
          style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}
        >
          <h1
            className="toppic"
            style={{
              textAlign: "center",
              color: "#333",
              marginBottom: "30px",
              fontSize: isSmallScreen ? "150%" : "250%",
            }}
          >
            Temperature Log Form
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: isSmallScreen ? "90%" : "45%",
            }}
          >
            <div
              className="temp"
              style={{
                borderRadius: "8px",
                backgroundColor: "#e8f0f2",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <label
                htmlFor="droneId"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Choose Drone ID
              </label>
              <select
                name="droneId"
                id="droneId"
                value={selectedDroneId}
                onChange={handleSelectChange}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  marginTop: "10px",
                  backgroundColor: "#fff",
                }}
              >
                {droneData.map((drone) => (
                  <option key={drone.drone_id} value={drone.drone_id}>
                    {drone.drone_id}
                  </option>
                ))}
              </select>
              {loading && (
                <p style={{ marginTop: "10px", color: "#888" }}>
                  Loading drone options...
                </p>
              )}

              {selectedDroneData && (
                <div style={{ marginTop: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Drone Info
                  </h3>
                  <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                    <li>
                      <strong>Drone ID:</strong>{" "}
                      {formatValue(selectedDroneData.drone_id)}
                    </li>
                    <li>
                      <strong>Drone Name:</strong>{" "}
                      {formatValue(selectedDroneData.drone_name)}
                    </li>
                    <li>
                      <strong>Country:</strong>{" "}
                      {formatValue(selectedDroneData.country)}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div
              className="temp"
              style={{
                minHeight: "20vh",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginTop: "30px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="celsius"
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "10px",
                    fontSize: isSmallScreen ? "95%" : "100%",
                  }}
                >
                  Add Temperature (Celsius, <sup>o</sup>C)
                </label>
                <input
                  type="number"
                  id="celsius"
                  name="celsius"
                  value={celsius}
                  onChange={(e) => setCelsius(e.target.value)}
                  style={{
                    width: "94.5%",
                    padding: "12px",
                    fontSize: "16px",
                    marginBottom: "15px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    fontSize: isSmallScreen ? "95%" : "100%",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    disabled={!celsius || loading}
                    style={{
                      padding: "12px 20px",
                      fontSize: "16px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      width: isSmallScreen ? "100%" : "35%",
                      fontSize: isSmallScreen ? "95%" : "100%",
                    }}
                  >
                    Submit
                  </button>
                </div>

                {submitStatus && (
                  <p
                    style={{
                      marginTop: "10px",
                      color: "#4CAF50",
                      fontWeight: "bold",
                      fontSize: isSmallScreen ? "80%" : "100%",
                    }}
                  >
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div
            style={{
              padding: "10px",
              width: isSmallScreen ? "90%" : "50%",
            }}
          >
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: isSmallScreen ? "auto" : "91.5%",
              }}
            >
              <h3
                style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
              >
                Submitted Data
              </h3>
              <table
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderCollapse: "collapse",
                  marginTop: "15px",
                  margin: "5px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        fontSize: "16px",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Field
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "12px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        fontSize: "16px",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submittedPayload ? (
                    <>
                      <tr style={{ backgroundColor: "#f9f9f9" }}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Drone ID
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "12px" }}
                        >
                          {submittedPayload.drone_id}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#fff" }}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Drone Name
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "12px" }}
                        >
                          {submittedPayload.drone_name}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#f9f9f9" }}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Country
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "12px" }}
                        >
                          {submittedPayload.country}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#fff" }}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Temperature (Celsius)
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "12px" }}
                        >
                          {submittedPayload.celsius}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #ddd",
                          padding: "12px",
                          textAlign: "center",
                          color: "#888",
                          fontStyle: "italic",
                        }}
                      >
                        No data submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
