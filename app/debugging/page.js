"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [displayedText, setDisplayedText] = useState("");
  const ocrResult =
    "For Israel to embed an explosive trigger within the new batch of pagers, they would have likely needed access to the supply chain of these devices, said Brussels-based military and security analyst Elijah egnier.";

  useEffect(() => {
    setDisplayedText(""); // Reset before starting
    if (!ocrResult) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= ocrResult.length) {
        setDisplayedText(ocrResult.slice(0, i)); // Use slice to prevent missing characters
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust timing if needed

    return () => clearInterval(interval);
  }, [ocrResult]);

  return (
    <div className="w-screen text-white min-h-screen bg-slate-500 p-4">
      <h1>Length of the OCR result text:</h1>
      <p>{ocrResult.length}</p>
      <p>{displayedText}</p>
      <h1>Length of the displayed text:</h1>
      <p>{displayedText.length}</p>
    </div>
  );
}

export default Page;
