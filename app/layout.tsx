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
    "/": [-2, 2, 4], // Home [0, 2, 4] // ORIGINAL WHEN THEY ARE CENTERED
    "/research": [3, 1.7, 3], // Research [3, 3, 3]
    "/education": [4, 1.5, -1], // Education [4, 2, 3]
    "/projects": [4, 1.2, -0.1], // Projects [0, 3, 5]
    "/music": [30, 15, 40], // Music [40, 20, 40]
    "/contact": [7, 2, 0], // Contact [7, 2, 0]
  };

  const lookAtMap: Record<string, [number, number, number]> = {
    "/": [-2, 1, 0],
    "/research": [-1.5, 0.7, 1.5],
    "/education": [2, 1.2, 0.7],
    "/projects": [0.7, 1, 2],
    "/music": [0, 1, 30],
    "/contact": [0, 1, 0],
  };

  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 5, 4]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([
    0, 1, 0,
  ]);

  useEffect(() => {
    setCameraPosition(cameraMap[pathname] || [0, 5, 4]);
    setCameraTarget(lookAtMap[pathname] || [0, 1, 0]);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-screen h-screen overflow-hidden`}
      >
        <Scene
          cameraPosition={cameraPosition}
          cameraTarget={cameraTarget}
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
