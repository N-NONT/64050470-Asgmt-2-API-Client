
export function getDroneIds() {
    if (!process.env.DRONE_IDS) {
      console.warn("No DRONE_IDS environment variable found");
      return []; 
    }
  
    const droneIds = process.env.DRONE_IDS.split(",").filter((id) => id.trim() !== "");
  
    if (droneIds.length === 0) {
      console.warn("No valid drone IDs provided");
      return []; 
    }
  
    return droneIds;
  }
  