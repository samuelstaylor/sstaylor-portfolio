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

  // Map each "page" to a camera position
  const cameraMap: Record<string, [number, number, number]> = {
    "/": [0, 3, 10],
    "/research": [5, 0, 8],
    "/education": [8, 3, 5],
    "/projects": [0, 5, 12],
    "/music": [-5, 3, 8],
    "/contact": [0, 8, 5],
  };

  // State to control target camera position
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 3, 10]);

  // Update camera target when pathname changes
  useEffect(() => {
    setCameraPosition(cameraMap[pathname] || [0, 3, 10]);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-screen h-screen overflow-hidden`}
      >
        {/* Persistent 3D Scene */}
        <Scene cameraPosition={cameraPosition} />

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
