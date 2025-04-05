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

  // ดึงข้อมูล droneData (ใช้ localStorage cache)
  useEffect(() => {
    const cached = localStorage.getItem("droneData");
    if (cached) {
      const data = JSON.parse(cached);
      setDroneData(data);
      setSelectedDroneId(data[0].drone_id);
      setSelectedDroneData(data[0]);
      setLoading(false); // เร็วขึ้นเพราะดึงจาก localStorage
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

    setTimeout(fetchData, 0); // ดึงข้อมูล async แบบไม่บล็อก render
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* ฝั่งซ้าย */}
      <div
        className="card configsL"
        style={{ marginTop: "60px", marginLeft: "20px", flexDirection: "column" }}
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
                    <td>{drone.drone_name}</td>
                    <td>{drone.light}</td>
                    <td>{drone.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ฝั่งขวา */}
      <div
        className="card configsR"
        style={{
          marginRight: "20px",
          marginLeft: "20px",
          marginTop: "60px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ส่วนบน */}
        <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
          <label htmlFor="droneId">Choose Drone ID</label>
          <select
            name="droneId"
            id="droneId"
            value={selectedDroneId || ""}
            onChange={handleSelectChange}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            disabled={loading}
          >
            {droneData.map((drone) => (
              <option key={drone.drone_id} value={drone.drone_id}>
                {drone.drone_id}
              </option>
            ))}
          </select>
        </div>

        {/* ส่วนล่าง */}
        <div style={{ flex: "1", padding: "10px", backgroundColor: "#e0e0e0" }}>
          {selectedDroneData ? (
            <div>
              <h3>Drone Information</h3>
              <ul>
                <li>
                  <strong>Drone ID:</strong> {selectedDroneData.drone_id}
                </li>
                <li>
                  <strong>Drone Name:</strong> {selectedDroneData.drone_name}
                </li>
                <li>
                  <strong>Light:</strong> {selectedDroneData.light}
                </li>
                <li>
                  <strong>Country:</strong> {selectedDroneData.country}
                </li>
              </ul>
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
