import "./css/globals.css";
import { getDroneIds } from "./services/getDroneIds";
import { fetchDroneData } from "./services/fetchDroneData";

export default async function HomePage() {
  const droneIds = getDroneIds();
  const droneData = await fetchDroneData(droneIds);

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', borderStyle: 'solid' }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>

      <div className="card configsL" style={{ marginTop: "60px", marginLeft:"20px" , flexDirection: "column" }}>
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



    <div className="card configsR" style={{ marginRight: "20px", marginLeft: "20px", marginTop: "60px", display: "flex", flexDirection: "column" }}>
         {/* ส่วนบน */}
         <div style={{ flex: "1", padding: "10px", backgroundColor: "#f0f0f0" }}>
           hello uu
         </div>
         {/* ส่วนล่าง */}
         <div style={{ flex: "1", padding: "10px", backgroundColor: "#e0e0e0" }}>
           {/* ใส่เนื้อหาหรือสิ่งที่ต้องการในส่วนล่าง */}
           <ul>
             {droneData.map((drone) => (
               <li key={drone.drone_id}>{drone.drone_id}</li>  
             ))}
           </ul>
         </div>
    </div>




    </div>
  );
}
