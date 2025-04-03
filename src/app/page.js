// app/page.js (Server Component)
import "./css/globals.css";

async function fetchDroneData() {
  const droneIds = process.env.DRONE_IDS.split(",");

  const droneData = await Promise.all(
    droneIds.map(async (droneId) => {
      try {
        const res = await fetch(
          `https://assignment1-470-371682635124.asia-southeast1.run.app/configs/${droneId}`
        );
        const data = await res.json();

        // ตรวจสอบว่า data.data มีข้อมูลหรือไม่
        if (data && data.drone_id) {
          return data; // หากมีข้อมูล, ให้ใช้ข้อมูลที่ได้รับจาก API
        } else {
          console.warn(`No data found for drone ID: ${droneId}`);
          return {
            drone_id: droneId,
            drone_name: "Unknown",
            light: "N/A",
            country: "Unknown",
          }; // คืนค่า default
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          drone_id: droneId,
          drone_name: "Error",
          light: "N/A",
          country: "Error",
        }; // คืนค่า error fallback
      }
    })
  );

  return droneData.filter((drone) => drone !== null); // กรองค่า null ที่อาจเกิดขึ้นจาก API ที่ไม่พบข้อมูล
}

export default async function HomePage() {
  const droneData = await fetchDroneData();

  return (
    <div className="card configs" style={{ marginLeft: 'auto', marginRight: '0' }}>
      <h1 style={{ textAlign: 'center' }}>Drone Configurations</h1>
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
  );
}

