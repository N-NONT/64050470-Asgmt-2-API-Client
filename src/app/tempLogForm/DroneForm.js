"use client";

import { useState, useEffect } from "react";
import { fetchDroneData } from "../services/fetchDroneData"; 

export default function DroneForm({ droneIds }) {
  const [droneData, setDroneData] = useState([]); 
  const [selectedDroneId, setSelectedDroneId] = useState(droneIds[0] || ""); 
  const [selectedDroneData, setSelectedDroneData] = useState(null); 


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDroneData(droneIds); 
      console.log("Drone Data:", data);  
      setDroneData(data);  
      if (data.length > 0) {
        setSelectedDroneId(data[0].drone_id);
        setSelectedDroneData(data[0]);
      }
    };

    fetchData();
  }, [droneIds]); 

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDroneId(selectedId);

    const selectedData = droneData.find((drone) => drone.drone_id.toString() === selectedId);
    if (selectedData) {
      setSelectedDroneData(selectedData); 
    } else {
      setSelectedDroneData(null); 
    }
  };

  return (
    <div>
      <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <label htmlFor="droneId">Choose Drone ID</label>
        <select
          name="droneId"
          id="droneId"
          value={selectedDroneId || ""}
          onChange={handleSelectChange}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        >
          {droneData.map((drone) => (
            <option key={drone.drone_id} value={drone.drone_id}>
              {drone.drone_id}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: "1", padding: "10px", backgroundColor: "#e0e0e0" }}>
        {selectedDroneData ? (
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


