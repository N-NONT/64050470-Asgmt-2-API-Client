export async function fetchDroneData(droneIds) {
    if (!process.env.CONFIG_SERVER_API_ENDPOINT) {
      console.error("CONFIG_SERVER_API_ENDPOINT is not defined in the environment variables");
      return [];
    }
  
    const apiEndpoint = process.env.CONFIG_SERVER_API_ENDPOINT;
  
    const droneData = await Promise.all(
      droneIds.map(async (droneId) => {
        try {
          const res = await fetch(`${apiEndpoint}${droneId}`);
  
          if (!res.ok) {
            console.warn(`Failed to fetch data for drone ID: ${droneId}, Status: ${res.status}`);
            return {
              drone_id: droneId,
              drone_name: "Error",
              light: "N/A",
              country: "Error",
            };
          }
  
          const data = await res.json();
  
          if (data && data.drone_id) {
            return data;
          } else {
            console.warn(`No valid data found for drone ID: ${droneId}`);
            return {
              drone_id: droneId,
              drone_name: "Unknown",
              light: "N/A",
              country: "Unknown",
            };
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          return {
            drone_id: droneId,
            drone_name: "Error",
            light: "N/A",
            country: "Error",
          };
        }
      })
    );
  
    return droneData.filter((drone) => drone !== null); 
  }
  