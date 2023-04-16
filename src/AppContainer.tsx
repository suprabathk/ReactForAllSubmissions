import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex py-10 h-max bg-gray-700 items-center">
      <div className="p-4 mx-auto w-[50%] bg-zinc-950 border border-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {props.children}
      </div>
    </div>
  );
}
