import "./css/globals.css";
import { getDroneIds } from "./css/services/getDroneIds";
import { fetchDroneData } from "./css/services/fetchDroneData";

export default async function HomePage() {
  const droneIds = getDroneIds();
  const droneData = await fetchDroneData(droneIds);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        className="card configs"
        style={{ marginRight: "20px", marginTop: "20px" }}
      >
        hello uu
      </div>

      <div className="card configs" style={{ marginTop: "20px" }}>
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
    </div>
  );
}

// async function fetchDroneData() {
//   if (!process.env.DRONE_IDS) {
//     console.warn("No DRONE_IDS environment variable found");
//     return []; // หากไม่มี DRONE_IDS ให้คืนค่าเป็น array เปล่า
//   }

//   const droneIds = process.env.DRONE_IDS.split(",").filter((id) => id.trim() !== "");

//   if (droneIds.length === 0) {
//     console.warn("No valid drone IDs provided");
//     return []; // หากไม่มี drone ID ที่ valid
//   }

//   const droneData = await Promise.all(
//     droneIds.map(async (droneId) => {
//       try {
//         const apiEndpoint = process.env.CONFIG_SERVER_API_ENDPOINT;

//         if (!apiEndpoint) {
//           console.error("CONFIG_SERVER_API_ENDPOINT is not defined in the environment variables");
//           return {
//             drone_id: droneId,
//             drone_name: "Error",
//             light: "N/A",
//             country: "Error",
//           };
//         }

//         const res = await fetch(`${apiEndpoint}${droneId}`);

//         // ตรวจสอบว่า API ส่งค่ามาหรือไม่
//         if (!res.ok) {
//           console.warn(`Failed to fetch data for drone ID: ${droneId}, Status: ${res.status}`);
//           return {
//             drone_id: droneId,
//             drone_name: "Error",
//             light: "N/A",
//             country: "Error",
//           };
//         }

//         const data = await res.json();

//         // ตรวจสอบว่า data มีข้อมูลที่ต้องการหรือไม่
//         if (data && data.drone_id) {
//           return data;
//         } else {
//           console.warn(`No valid data found for drone ID: ${droneId}`);
//           return {
//             drone_id: droneId,
//             drone_name: "Unknown",
//             light: "N/A",
//             country: "Unknown",
//           };
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         return {
//           drone_id: droneId,
//           drone_name: "Error",
//           light: "N/A",
//           country: "Error",
//         };
//       }
//     })
//   );

//   return droneData.filter((drone) => drone !== null); // กรองค่า null ที่อาจเกิดขึ้นจาก API ที่ไม่พบข้อมูล
// }

// export default async function HomePage() {
//   const droneData = await fetchDroneData();

//   return (
// <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//   <div className="card configs" style={{ marginRight: '20px', marginTop: '20px' }}>
//     hello uu
//   </div>

//   <div className="card configs" style={{ marginTop: '20px' }}>
//     <h1 className='toppic' style={{ textAlign: 'center' }}>Drone Configurations</h1>
//     <div className="table-wrapper">
//       <table>
//         <thead>
//           <tr>
//             <th>Drone ID</th>
//             <th>Drone Name</th>
//             <th>Light</th>
//             <th>Country</th>
//           </tr>
//         </thead>
//         <tbody>
//           {droneData.map((drone) => (
//             <tr key={drone.drone_id}>
//               <td>{drone.drone_id}</td>
//               <td>{drone.drone_name}</td>
//               <td>{drone.light}</td>
//               <td>{drone.country}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//   );
// }
