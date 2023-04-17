import { ActiveLink } from "raviger";
import logo from "./logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 justify-between items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <div className="flex gap-2 text-gray-400 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <ActiveLink
            href={link.url}
            key={link.url}
            className="p-2 m-2 uppercase"
            exactActiveClass="text-black"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
}
