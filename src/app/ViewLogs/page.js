import "../css/globals.css";
import ViewLogs from "./ViewLogs";
import { getDroneIds } from "../services/getDroneIds";

export const metadata = {
  title: "View Logs",
};

export default function Page() {
  const droneIds = getDroneIds();

  return (
    <div>
      <ViewLogs droneIds={droneIds} />
    </div>
  );
}
