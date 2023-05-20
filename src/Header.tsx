import { ActiveLink } from "raviger";
import logo from "./logo.svg";
import { User } from "./types/userTypes";

export default function Header(props: { currentUser: User }) {
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
          ...(props.currentUser.username &&
          props.currentUser?.username.length > 0
            ? [
                {
                  page: "Logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "Login", url: "/login" }]),
        ].map((link) => {
          if (link.url) {
            return (
              <ActiveLink
                href={link.url}
                key={link.page}
                className="p-2 m-2 uppercase"
                exactActiveClass="text-black"
              >
                {link.page}
              </ActiveLink>
            );
          } else {
            return (
              <button
                onClick={link.onClick}
                key={link.page}
                className="p-2 m-2 uppercase"
              >
                {link.page}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
