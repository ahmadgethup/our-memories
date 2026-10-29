import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppStyles from "../components/AppStyles";

export const metadata: Metadata = {
  title: "Our Memories",
  description: "Our private space for memories, notes and plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          background: "#0d0005",
          overflowX: "hidden",
        }}
      >
        <AppStyles />
        {children}
      </body>
    </html>
  );
}
