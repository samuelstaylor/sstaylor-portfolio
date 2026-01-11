import Scene from "./components/Scene";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* 3D Scene */}
      <Scene />

      {/* Text Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="p-16 max-w-2xl text-white">
          <h1 className="text-5xl font-bold tracking-tight">Samuel Taylor</h1>
          <p className="mt-4 text-lg opacity-80">
            Computational Condensed Matter Physics · TDDFT · Scientific
            Computing · 3D Design
          </p>
        </div>
      </div>
    </main>
  );
}
