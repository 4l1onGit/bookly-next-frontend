import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Reviews", href: "/reviews" },
];

const NavBody = () => {
  return (
    <ul className="space-x-4 flex">
      {links.map((link) => (
        <li key={link.name} className="hover:underline">
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBody;
