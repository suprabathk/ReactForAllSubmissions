import React, { useState } from "react";
import Header from "./Header";
import { User } from "./types/userTypes";
import { DownArrow } from "./AppIcons";
import { KeyboardHints } from "./customComponents/KeyboardHints";

export default function AppContainer(props: {
  currentUser: User;
  children: React.ReactNode;
}) {
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="flex flex-col gap-4 py-10 h-max items-center">
      <div className="p-4 mx-auto w-[50%] bg-white border border-gray-300 shadow-md shadow-gray-400 rounded-xl">
        <Header currentUser={props.currentUser} />
        <div className="px-4 pb-4">{props.children}</div>
      </div>
      <div className="px-4 mx-auto w-[50%] bg-white border border-gray-300 shadow-md shadow-gray-400 rounded-xl">
        <button
          className="w-full flex justify-between items-center py-1 text-gray-700"
          onClick={() => setShowHints((showHints) => !showHints)}
        >
          <span className="font-semibold">
            {showHints ? "Hide" : "Show"} Keyboard navigantion hints
          </span>
          <DownArrow
            className={`transition-all w-5 h-5 ${
              showHints ? "rotate-180" : ""
            }`}
          />
        </button>
        {showHints && <KeyboardHints />}
      </div>
    </div>
  );
}
