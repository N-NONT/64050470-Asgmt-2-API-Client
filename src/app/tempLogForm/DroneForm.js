"use client";

import { useState, useEffect } from "react";
import { fetchDroneData } from "../services/fetchDroneData";

export default function DroneForm({ droneIds }) {
  const [droneData, setDroneData] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState("");
  const [selectedDroneData, setSelectedDroneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [celsius, setCelsius] = useState(""); // ← user input
  const [submitStatus, setSubmitStatus] = useState(null); // ← status message

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
    const selectedData = droneData.find((drone) => drone.drone_id.toString() === selectedId);
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
      const res = await fetch("https://assignment1-470-371682635124.asia-southeast1.run.app/logs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("✅ Data submitted successfully.");
        setCelsius("");
      } else {
        setSubmitStatus("❌ Failed to submit data.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("❌ Error during submission.");
    }
  };

  return (
    <div>
      {/* Drone selector */}
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
        {loading && <p>Loading drone options...</p>}
      </div>

      {/* Drone Info */}
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

      {/* Form for Celsius */}
      <form onSubmit={handleSubmit} style={{ padding: "10px", backgroundColor: "#fff", marginTop: "20px" }}>
        <label htmlFor="celsius"><strong>Temperature (Celsius):</strong></label>
        <input
          type="number"
          id="celsius"
          name="celsius"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "5px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          disabled={!celsius || loading}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Submit Data
        </button>
        {submitStatus && <p style={{ marginTop: "10px" }}>{submitStatus}</p>}
      </form>
    </div>
  );
}


