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
      if (window.innerWidth <= 768) {
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
        justifyContent: "space-between",
      }}
    >

      <div
        className="card configsL"
        style={{
          marginTop: "100px",
          marginLeft: "20px",
          marginRight: isSmallScreen ? "20px" : "0", 
          flexDirection: "column",
          width: isSmallScreen ? "90%" : "55%", 
          marginTop: isSmallScreen ? "20%" : "4%", 
          fontSize: isSmallScreen ? "20%" : "100%", 
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
          marginTop: "100px",
          marginLeft: "20px",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
          width: isSmallScreen ? "90%" : "45%", 
          marginTop: isSmallScreen ? "5%" : "4%", 
          fontSize: isSmallScreen ? "20%" : "100%", 
        }}
      >
        <div style={{ flex: "0", padding: "10px" }}>
          <br />
          <br />
          <label htmlFor="droneId">
            <span style={{ fontSize: "20px" }}>Choose Drone ID</span>
          </label>
          <br />
          <br />
          <select
            name="droneId"
            id="droneId"
            value={selectedDroneId || ""}
            onChange={handleSelectChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
            disabled={loading}
          >
            {droneData.map((drone) => (
              <option key={drone.drone_id} value={drone.drone_id}>
                {drone.drone_id}
              </option>
            ))}
          </select>
          <br />
          <br />
          <hr />
        </div>

        <div
          style={{
            flex: "1",
            padding: "10px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            marginTop: "30px",
          }}
        >
          {selectedDroneData ? (
            <div>
              <h3 style={{ textAlign: "center" }}>Drone Information</h3>

              <div className="data-table">
                <table style={{ backgroundColor: "white" }}>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Drone ID</strong>
                      </td>
                      <td>{selectedDroneData.drone_id}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Drone Name</strong>
                      </td>
                      <td>{formatValue(selectedDroneData.drone_name)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Light</strong>
                      </td>
                      <td>{formatValue(selectedDroneData.light)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Country</strong>
                      </td>
                      <td>{formatValue(selectedDroneData.country)}</td>
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

