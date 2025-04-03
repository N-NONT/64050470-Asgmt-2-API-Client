import "./css/globals.css";

export const metadata = { 
  title: "View Config",
  icons: "/KMITL.png",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet"/>
      </head>
      <body>
        {/* Navbar */}
        <nav className="navbar">
          <ul>
            <li><a href="/">Home</a></li>
            {/* <li><a href="/page2">Page 2</a></li>
            <li><a href="/page3">Page 3</a></li>
            <li><a href="/page4">Page 4</a></li> */}
          </ul>
        </nav>

        {/* Layout UI */}
        <main className="content">{children}</main>
      </body>
    </html>
  );
}
