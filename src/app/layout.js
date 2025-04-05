import "./css/globals.css";
import Link from "next/link";

export const metadata = {
  title: "View Config",
  icons: "/KMITL.png",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="h-screen overflow-hidden">
        {/* Navbar */}
        <nav className="navbar">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tempLogForm">Temperature Log Form </Link>
            </li>
            <li>
              <Link href="/ViewLogs">View Logs</Link>
            </li>
            {/* <li><Link href="/page4">Page 4</Link></li> */}
          </ul>
        </nav>

        <main className="content">{children}</main>
      </body>
    </html>
  );
}
