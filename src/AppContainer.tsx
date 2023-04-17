import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex py-10 h-max items-center">
      <div className="p-4 mx-auto w-[50%] bg-white border border-gray-300 shadow-md shadow-gray-400 rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {props.children}
      </div>
    </div>
  );
}
