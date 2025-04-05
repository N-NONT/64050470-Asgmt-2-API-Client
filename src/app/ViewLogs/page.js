import ViewLogs from "./ViewLogs";
export const metadata = { 
  title: "View Logs",
};

export default async function Page3() {
  return (
    <div style={{ marginTop: "60px" }}>
      <ViewLogs/>
    </div>
  );
}

