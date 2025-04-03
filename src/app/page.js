import "./css/globals.css";
import { getDroneIds } from "./services/getDroneIds";
import { fetchDroneData } from "./services/fetchDroneData";

export default async function HomePage() {
  const droneIds = getDroneIds();
  const droneData = await fetchDroneData(droneIds);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="card configs" style={{ marginRight: "20px", marginTop: "20px" }}>
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
