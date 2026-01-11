import Link from "next/link";

export default function Navbar() {
  const pages = [
    "home",
    "research",
    "education",
    "projects",
    "music",
    "contact",
  ];

  return (
    <nav className="p-4 bg-gray-800 text-white flex space-x-4 fixed top-0 left-0 right-0 z-10">
      {pages.map((page) => (
        <Link
          key={page}
          href={page === "home" ? "/" : `/${page}`}
          className="hover:underline capitalize"
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
