import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const pages = [
    { label: "Home", href: "/" },
    { label: "Bio", href: "/bio" },
    { label: "Research", href: "/research" },
    { label: "Education", href: "/education" },
    { label: "Projects", href: "/projects" },
    { label: "Music", href: "/music" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex gap-6 px-8 py-3 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-lg">
        {pages.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors ${
                active
                  ? "text-emerald-300"
                  : "text-slate-300 hover:text-slate-100"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
