import { navigate } from "raviger";
import React, { useCallback, useEffect } from "react";

export default function About() {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.shiftKey === true) {
      if (event.key === "H") {
        navigate("/");
      }
      if (event.key === "L") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);
  return <div className="text-gray-700">About page</div>;
}
