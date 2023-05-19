import React from "react";

export function KeyboardKeyIcon(props: { shift: boolean; letter: string }) {
  return (
    <div className="flex gap-1 h-fit font-semibold">
      {props.shift && (
        <div className="bg-slate-200 border border-slate-700 rounded-sm px-2">
          Shift
        </div>
      )}
      {props.shift && <span>+</span>}
      <div className="bg-slate-200 border border-slate-700 rounded-sm px-2">
        {props.letter}
      </div>
    </div>
  );
}