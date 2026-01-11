"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  // Closer, higher camera positions for a more dramatic view
  const cameraMap: Record<string, [number, number, number]> = {
    "/": [0, 2, 4],
    "/research": [3, 3, 3],
    "/education": [4, 2, 3],
    "/projects": [0, 3, 5],
    "/music": [-3, 2, 3],
    "/contact": [0, 2.5, 3],
  };

  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 5, 4]);

  useEffect(() => {
    setCameraPosition(cameraMap[pathname] || [0, 5, 4]);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-screen h-screen overflow-hidden`}
      >
        {/* Persistent 3D Scene */}
        <Scene cameraPosition={cameraPosition} isHome={pathname === "/"} />

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
