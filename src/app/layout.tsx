"use client";

import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { Providers } from "./provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <Layout.Content style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {children}
            </Layout.Content>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}