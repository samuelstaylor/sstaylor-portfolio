"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@react-three/drei";

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

  const cameraMap: Record<string, [number, number, number]> = {
    "/": [0, 2, 4],
    "/research": [3, 3, 3],
    "/education": [4, 2, 3],
    "/projects": [0, 3, 5],
    "/music": [40, 20, 40],
    "/contact": [7, 2, 0],
  };

  // Camera-local offsets: [right, up, forward]
  const cameraOffsetMap: Record<string, [number, number, number]> = {
    "/": [-2, 0, 0], // slide LEFT
    "/research": [0, 0, 0],
    "/education": [0, 0, 0],
    "/projects": [0, 0, 0],
    "/music": [0, 0, 0],
  };

  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 5, 4]);

  const [cameraLocalOffset, setCameraLocalOffset] = useState<
    [number, number, number]
  >([0, 0, 0]);

  useEffect(() => {
    setCameraPosition(cameraMap[pathname] || [0, 5, 4]);
    setCameraLocalOffset(cameraOffsetMap[pathname] || [0, 0, 0]);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-screen h-screen overflow-hidden`}
      >
        <Scene
          cameraPosition={cameraPosition}
          cameraLocalOffset={cameraLocalOffset}
          isHome={pathname === "/"}
          isResearch={pathname === "/research"}
          isEducation={pathname === "/education"}
          isMusic={pathname === "/music"}
          isProjects={pathname === "/projects"}
        />

        <Loader />

        <div className="absolute inset-0 z-10 flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
