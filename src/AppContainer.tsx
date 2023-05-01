import React from "react";
import Header from "./Header";
import { User } from "./types/userTypes";

export default function AppContainer(props: {
  currentUser: User;
  children: React.ReactNode;
}) {
  return (
    <div className="flex py-10 h-max items-center">
      <div className="p-4 mx-auto w-[50%] bg-white border border-gray-300 shadow-md shadow-gray-400 rounded-xl">
        <Header currentUser={props.currentUser} />
        <div className="px-4 pb-4">{props.children}</div>
      </div>
    </div>
  );
}
