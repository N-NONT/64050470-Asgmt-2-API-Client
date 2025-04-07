"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function About() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "10px",
    fontSize: isSmallScreen ? "8px" : "16px",
    boxShadow: "inset 0 0 1px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        // overflow: "hidden",
        fontSize: isSmallScreen ? "8px" : "",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: "20px",
          width: "80vw",
          height: isSmallScreen ? "auto" : "80vh",
          marginTop: isSmallScreen ? "auto" : "auto",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "30px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Assignment #2
          </h1>
          <h2 style={{ textAlign: "center", color: "#444" }}>
            Create a Web Client with HTML, CSS, and JavaScript
          </h2>
          <p style={{ textAlign: "center", marginTop: "0px", color: "#777" }}>
            Web Client สำหรับใช้กับบริการข้อมูล Drone API Server
          </p>

          <hr style={{ margin: "30px 0" }} />

          <h3 style={{ fontWeight: "bold" }}>รายละเอียดเพิ่มเติม</h3>

          <div style={{ marginTop: "15px" }}>
            <div style={cardStyle}>
              <strong>
                <Link
                  href="/"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Page #1: View Config
                </Link>
              </strong>
              <p style={{ margin: 0 }}>
                - แสดงข้อมูล config ของ Drone ดังนี้ ID, Name, Light, Country
                โดยดึงจาก API Server
              </p>
            </div>

            <div style={cardStyle}>
              <strong>
                <Link
                  href="/tempLogForm"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Page #2: Temperature Log Form
                </Link>
              </strong>

              <p style={{ margin: 0 }}>
                - ฟอร์มสำหรับให้ผู้ใช้กรอกอุณหภูมิ แล้ว POST ไปยัง API Server
                เพื่อสร้าง Log ใหม่
              </p>
            </div>

            <div style={cardStyle}>
              <strong>
                <Link
                  href="/ViewLogs"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  Page #3: View Logs
                </Link>
              </strong>
              <p style={{ margin: 0 }}>
                - แสดงประวัติ Logs ของ Drone ล่าสุด 25 รายการในตาราง
              </p>
            </div>

            <div style={cardStyle}>
              <strong>.env File</strong>
              <p style={{ margin: 0 }}>- เก็บค่า DRONE_ID</p>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "30px",
            boxSizing: "border-box",
            overflowY: "auto",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            fontSize: isSmallScreen ? "8px" : "",
          }}
        >
          <div>
            <hr style={{ margin: "30px 0" }} />
            <h1>Assignment 1</h1>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <a
                href="https://assignment1-470-371682635124.asia-southeast1.run.app/"
                style={{ textAlign: "center" }}
              >
                <img style={{ width: "15%" }} src="/server.png" alt="Server" />
                <div>Server</div>
              </a>

              <a
                href="https://github.com/N-NONT/64050470-Asgmt-1-API-Server.git"
                style={{ textAlign: "center" }}
              >
                <img style={{ width: "15%" }} src="/git-hub.png" alt="GitHub" />
                <div>GitHub</div>
              </a>
            </div>
          </div>

          <div>
            <hr style={{ margin: "30px 0" }} />
            <h1>Assignment 2</h1>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <a
                href="https://assignment2-470-371682635124.asia-southeast1.run.app/"
                style={{ textAlign: "center" }}
              >
                <img style={{ width: "15%" }} src="/webicon.png" alt="Server" />
                <div>Website</div>
              </a>

              <a
                href="https://github.com/N-NONT/64050470-Asgmt-2-API-Client.git"
                style={{ textAlign: "center" }}
              >
                <img style={{ width: "15%" }} src="/git-hub.png" alt="GitHub" />
                <div>GitHub</div>
              </a>
            </div>
          </div>

          <div
            style={{ marginTop: "40px", textAlign: "center", color: "#888" }}
          >
            <hr style={{ margin: "30px 0" }} />
            <p>ธนพนธ์ เป็นสุข | รหัสนักศึกษา 64050470</p>
            <p>WEB APPLICATION DEVELOPMENT | รหัสวิชา 01236337</p>
          </div>
        </div>
      </div>
    </div>
  );
}
