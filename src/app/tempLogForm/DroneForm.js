"use client";

import { useState, useEffect } from "react";
import { fetchDroneData } from "../services/fetchDroneData";

export default function DroneForm({ droneIds }) {
  const [droneData, setDroneData] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState("");
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [loading, setLoading] = useState(true);

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

    setTimeout(fetchData, 0); // ไม่บล็อก render
  }, [droneIds]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDroneId(selectedId);
    const selectedData = droneData.find((drone) => drone.drone_id.toString() === selectedId);
    setSelectedDroneData(selectedData || null);
  };

  return (
    <div>
      <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <label htmlFor="droneId">Choose Drone ID</label>
        <select
          name="droneId"
          id="droneId"
          value={selectedDroneId}
          onChange={handleSelectChange}
          disabled={loading}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        >
          {droneData.map((drone) => (
            <option key={drone.drone_id} value={drone.drone_id}>
              {drone.drone_id}
            </option>
          ))}
        </select>
        {loading && <p style={{ marginTop: "10px" }}>Loading drone options...</p>}
      </div>

      <div style={{ flex: "1", padding: "10px", backgroundColor: "#e0e0e0" }}>
        {loading ? (
          <p>Loading drone data...</p>
        ) : selectedDroneData ? (
          <div>
            <h3>Drone Information</h3>
            <ul>
              <li><strong>Drone ID:</strong> {selectedDroneData.drone_id}</li>
              <li><strong>Drone Name:</strong> {selectedDroneData.drone_name}</li>
              <li><strong>Light:</strong> {selectedDroneData.light}</li>
              <li><strong>Country:</strong> {selectedDroneData.country}</li>
            </ul>
          </div>
        ) : (
          <p>No drone data available</p>
        )}
      </div>
    </div>
  );
}

