import "../css/globals.css";
import DroneForm from "./DroneForm";
import { getDroneIds } from "../services/getDroneIds";

export default async function Page2() {
  const droneIds = getDroneIds(); 

  return (
    <div style={{ marginTop: "60px" }}>
      <DroneForm droneIds={droneIds} />
    </div>
  );
}

