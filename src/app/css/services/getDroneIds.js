
export function getDroneIds() {
    if (!process.env.DRONE_IDS) {
      console.warn("No DRONE_IDS environment variable found");
      return []; // หากไม่มี DRONE_IDS ให้คืนค่าเป็น array เปล่า
    }
  
    const droneIds = process.env.DRONE_IDS.split(",").filter((id) => id.trim() !== "");
  
    if (droneIds.length === 0) {
      console.warn("No valid drone IDs provided");
      return []; // หากไม่มี drone ID ที่ valid
    }
  
    return droneIds;
  }
  