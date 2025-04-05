"use client";

import { useState } from "react";
import { fetchDroneData } from "../services/fetchDroneData";

export default function DroneForm({ droneIds }) {
  const [selectedId, setSelectedId] = useState(droneIds[0] || "");
  const [droneInfo, setDroneInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected Drone ID:", selectedId); 
    const data = await fetchDroneData([selectedId]);

    if (data.length > 0) {
      setDroneInfo(data[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="droneId">Choose Drone Id</label>
      <select
        name="droneId"
        id="droneId"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {droneIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>

      <br />
      <br />
      <input type="submit" value="Submit" />

      {droneInfo && (
        <div style={{ marginTop: "20px" }}>
          <h3>Drone Info:</h3>
          <p><strong>ID:</strong> {droneInfo.drone_id}</p>
          <p><strong>Name:</strong> {droneInfo.drone_name}</p>
          <p><strong>Light:</strong> {droneInfo.light}</p>
          <p><strong>Country:</strong> {droneInfo.country}</p>
        </div>
      )}
    </form>
  );
}
