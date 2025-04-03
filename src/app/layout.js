import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet"/>
      </head>
      <body>

        <nav className="navbar">
          <ul>
            <li><Link href="/">Home</Link></li>
            {/* <li><Link href="/page2">Page 2</Link></li>
            <li><Link href="/page3">Page 3</Link></li>
            <li><Link href="/page4">Page 4</Link></li> */}
          </ul>
        </nav>

        {/* Layout UI */}
        <main className="content">{children}</main>
      </body>
    </html>
  );
}
