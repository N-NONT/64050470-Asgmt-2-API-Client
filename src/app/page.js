"use client";
import "./css/globals.css";
import { useState, useEffect } from "react";
import { getDroneIds } from "./services/getDroneIds";
import { fetchDroneData } from "./services/fetchDroneData";

export default function HomePage() {
  const [droneData, setDroneData] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState(null);
  const [selectedDroneData, setSelectedDroneData] = useState(null);

  // ดึงข้อมูล droneData เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const droneIds = getDroneIds();
    const fetchData = async () => {
      const data = await fetchDroneData(droneIds);
      console.log("Drone Data:", data);  // ตรวจสอบข้อมูลที่ได้รับ
      setDroneData(data);
      if (data.length > 0) {
        // ตั้งค่าเริ่มต้นเป็น drone ตัวแรก
        setSelectedDroneId(data[0].drone_id);
        setSelectedDroneData(data[0]);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDroneId(selectedId);

    // เปรียบเทียบค่า selectedId ให้ถูกต้อง
    const selectedData = droneData.find((drone) => drone.drone_id.toString() === selectedId);

    if (selectedData) {
      setSelectedDroneData(selectedData);
    } else {
      setSelectedDroneData(null);  // ถ้าไม่พบข้อมูลให้ตั้งค่า selectedDroneData เป็น null
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* ฝั่งซ้าย */}
      <div className="card configsL" style={{ marginTop: "60px", marginLeft: "20px", flexDirection: "column" }}>
        <h1 className="toppic" style={{ textAlign: "center" }}>
          Drone Configurations
        </h1>
        <div className="table-wrapper">
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
        </div>
      </div>

      {/* ฝั่งขวา */}
      <div className="card configsR" style={{ marginRight: "20px", marginLeft: "20px", marginTop: "60px", display: "flex", flexDirection: "column" }}>
        {/* ส่วนบน */}
        <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
          <label htmlFor="droneId">Choose Drone ID</label>
          <select
            name="droneId"
            id="droneId"
            value={selectedDroneId || ""}  // เลือกค่าจาก selectedDroneId
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

        {/* ส่วนล่าง */}
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
    </div>
  );
}



// import "./css/globals.css";
// import { getDroneIds } from "./services/getDroneIds";
// import { fetchDroneData } from "./services/fetchDroneData";

// export default async function HomePage() {
//   const droneIds = getDroneIds();
//   const droneData = await fetchDroneData(droneIds);

//   return (
//     // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', borderStyle: 'solid' }}>
//     <div style={{ display: "flex", justifyContent: "space-between" }}>

//       <div className="card configsL" style={{ marginTop: "60px", marginLeft:"20px" , flexDirection: "column" }}>
//         <h1 className="toppic" style={{ textAlign: "center" }}>
//           Drone Configurations
//         </h1>
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>Drone ID</th>
//                 <th>Drone Name</th>
//                 <th>Light</th>
//                 <th>Country</th>
//               </tr>
//             </thead>
//             <tbody>
//               {droneData.map((drone) => (
//                 <tr key={drone.drone_id}>
//                   <td>{drone.drone_id}</td>
//                   <td>{drone.drone_name}</td>
//                   <td>{drone.light}</td>
//                   <td>{drone.country}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>



//     <div className="card configsR" style={{ marginRight: "20px", marginLeft: "20px", marginTop: "60px", display: "flex", flexDirection: "column" }}>
//          {/* ส่วนบน */}
//          <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
//            hello uu
//          </div>
//          {/* ส่วนล่าง */}
//          <div style={{ flex: "1", padding: "10px", backgroundColor: "#e0e0e0" }}>
//            {/* ใส่เนื้อหาหรือสิ่งที่ต้องการในส่วนล่าง */}
//            <ul>
//              {droneData.map((drone) => (
//                <li key={drone.drone_id}>{drone.drone_id}</li>  
//              ))}
//            </ul>
//          </div>
//     </div>




//     </div>
//   );
// }
