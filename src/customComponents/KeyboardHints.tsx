import React from "react";
import { KeyboardKeyIcon } from "./KeyboardKeyIcon";

export function KeyboardHints() {
  return (
    <div className="flex flex-col gap-1 text-gray-600 py-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-gray-700">Navigation</h3>
        <div className="flex justify-between items-center">
          <span>Go to Home</span>
          <KeyboardKeyIcon shift={true} letter={"H"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Go to About</span>
          <KeyboardKeyIcon shift={true} letter={"A"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Logout</span>
          <KeyboardKeyIcon shift={true} letter={"L"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-gray-700 py-2">Home page</h3>
        <div className="flex justify-between items-center">
          <span>Create New Form</span>
          <KeyboardKeyIcon shift={true} letter={"C"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Search</span>
          <KeyboardKeyIcon shift={true} letter={"S"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Open forms</span>
          <div className="flex gap-1">
            <KeyboardKeyIcon shift={false} letter={"1"} />
            <span>or</span>
            <KeyboardKeyIcon shift={false} letter={"2"} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Open form preview</span>
          <div className="flex gap-1">
            <KeyboardKeyIcon shift={true} letter={"1"} />
            <span>or</span>
            <KeyboardKeyIcon shift={true} letter={"2"} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Next page</span>
          <KeyboardKeyIcon shift={true} letter={"N"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Prev page</span>
          <KeyboardKeyIcon shift={true} letter={"P"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-gray-700">
          Create form page
        </h3>
        <div className="flex justify-between items-center">
          <span>Cancel</span>
          <KeyboardKeyIcon shift={false} letter={"Esc"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Create</span>
          <KeyboardKeyIcon shift={false} letter={"Enter"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-gray-700">
          Form builder page
        </h3>
        <div className="flex justify-between items-center">
          <span>New field</span>
          <KeyboardKeyIcon shift={true} letter={"N"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Cancel</span>
          <KeyboardKeyIcon shift={false} letter={"Esc"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-gray-700">
          Preview form page
        </h3>
        <div className="flex justify-between items-center">
          <span>Next question</span>
          <KeyboardKeyIcon shift={false} letter={">"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Previous question</span>
          <KeyboardKeyIcon shift={false} letter={"<"} />
        </div>
      </div>
    </div>
  );
}
