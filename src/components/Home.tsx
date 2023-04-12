import React from "react";
import logo from "../logo.svg";

export function Home(props: { openFormsListCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex text-white">
        <img src={logo} alt="" className="h-48" />
        <div className="flex-1 flex justify-center items-center h-48">
          <p>Welcome to the Home Page</p>
        </div>
      </div>
      <button
        className="bg-gray-700 py-2 rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
        onClick={props.openFormsListCB}
      >
        View Forms
      </button>
    </div>
  );
}
