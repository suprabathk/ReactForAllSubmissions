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
    <div className="flex justify-between px-2 py-1 bg-green-200 border border-green-700 rounded-md text-green-700 mt-2">
      <label>Get Shareable Link</label>
      <CopyToClipboard
        text={`localhost:3000/form/${props.formID}`}
        onCopy={onCopy}
      >
        <button className="flex gap-2 items-center">
          <ClipboardIcon className={"w-4 h-4"} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
    </div>
  );
}
