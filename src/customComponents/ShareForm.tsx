import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { ClipboardIcon } from "../AppIcons";

export default function ShareForm(props: { formID: number }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div
      className={`transition-all flex justify-between px-2 py-1  border  rounded-md  mt-2 ${
        copied
          ? "bg-green-200 border-green-700 text-green-700"
          : "bg-gray-100 border-gray-600 text-gray-700"
      }`}
    >
      <label>Get Shareable Link</label>
      <CopyToClipboard
        text={`localhost:3000/preview/${props.formID}`}
        onCopy={onCopy}
      >
        <button className="flex gap-2 items-center text-green-700">
          <ClipboardIcon className={"w-4 h-4"} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
    </div>
  );
}
