"use client";
import "./css/globals.css";
import { useState, useEffect } from "react";
import { getDroneIds } from "./services/getDroneIds";
import { fetchDroneData } from "./services/fetchDroneData";

export default function HomePage() {
  const [droneData, setDroneData] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState(null);
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const formatValue = (value) =>
    value === "Error" || value === "N/A" ? "Loading..." : value;

  useEffect(() => {
    const cached = localStorage.getItem("droneData");
    if (cached) {
      const data = JSON.parse(cached);
      setDroneData(data);
      setSelectedDroneId(data[0].drone_id);
      setSelectedDroneData(data[0]);
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const droneIds = getDroneIds();
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

    fetchData();

    const handleResize = () => {
      if (window.innerWidth <= 1007) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDroneId(selectedId);
    const selectedData = droneData.find(
      (drone) => drone.drone_id.toString() === selectedId
    );
    setSelectedDroneData(selectedData || null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        height: isSmallScreen ? "" : "100vh",
        padding: isSmallScreen ? "20px" : "0",
        marginTop: isSmallScreen ? "50px" : "20px",
      }}
    >
      <div
        className="card configsL"
        style={{
          flexDirection: "column",
          width: isSmallScreen ? "90%" : "55%",
          fontSize: isSmallScreen ? "70%" : "100%",
          height: "86%",
        }}
      >
        <h1 className="toppic" style={{ textAlign: "center" }}>
          Drone Configurations
        </h1>
        <div className="table-wrapper">
          {loading ? (
            <p>Loading drone data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Drone ID</th>
                  <th>Drone Name</th>
                  <th>Light</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {droneData.map((drone) => (
                  <tr key={drone.drone_id}>
                    <td>{drone.drone_id}</td>
                    <td>{formatValue(drone.drone_name)}</td>
                    <td>{formatValue(drone.light)}</td>
                    <td>{formatValue(drone.country)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div
        className="card configsR"
        style={{
          flexDirection: "column",
          width: isSmallScreen ? "90%" : "45%",
          fontSize: isSmallScreen ? "70%" : "100%",
          height: "86%",
        }}
      >
        <div style={{ flex: "0", padding: "10px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: isSmallScreen ? "18px" : "20px",
            }}
          >
            Choose Drone ID
          </h2>
          <select
            name="droneId"
            id="droneId"
            value={selectedDroneId || ""}
            onChange={handleSelectChange}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              marginBottom: "20px",
            }}
            disabled={loading}
          >
            {droneData.map((drone) => (
              <option key={drone.drone_id} value={drone.drone_id}>
                {drone.drone_id}
              </option>
            ))}
          </select>
          {loading && <p style={{ color: "#888" }}>Loading drone options...</p>}
          <hr />
        </div>

        <div
          style={{
            flex: "1",
            padding: "20px",
            backgroundColor: "#e8f0f2",
            borderRadius: "10px",
            marginTop: "30px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {selectedDroneData ? (
            <div>
              <h3
                style={{
                  textAlign: "center",
                  fontSize: isSmallScreen ? "16px" : "20px",
                }}
              >
                Drone Information
              </h3>

              <div className="data-table">
                <table
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #ddd",
                        }}
                      >
                        Drone ID
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        {selectedDroneData.drone_id}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #ddd",
                        }}
                      >
                        Drone Name
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        {formatValue(selectedDroneData.drone_name)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #ddd",
                        }}
                      >
                        Light
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        {formatValue(selectedDroneData.light)}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: "bold",
                          backgroundColor: "#f9f9f9",
                          border: "1px solid #ddd",
                        }}
                      >
                        Country
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        {formatValue(selectedDroneData.country)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : loading ? (
            <p>Loading drone details...</p>
          ) : (
            <p>No drone data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
