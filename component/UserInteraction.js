"use client";

import { useEffect, useRef, useState } from "react";
import ExplanationCard from "./ExplanationCard";
import UploadImage from "./UploadImage";
function UserInteraction() {
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgurl, setImgurl] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [response, setResponse] = useState("");
  const textAreaRef = useRef(null);
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.imageUrl) {
      await setImgurl(data.imageUrl);
    }
  };

  async function fetchOCR() {
    setResponse("");
    setOcrResult("");
    setLoading(true);
    try {
      const response = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: imgurl || "http://dl.a9t9.com/ocrbenchmark/eng.png",
        }),
      });

      const data = await response.json();
      if (data.ErrorMessage) {
        throw data.ErrorMessage;
      }

      setOcrResult(data.ParsedResults[0].ParsedText.replace(/\r?\n/g, " "));
    } catch (error) {
      console.error("Error fetching OCR data:", error);
    } finally {
      setLoading(false);
    }
  }
  const fetchResponse = async (question) => {
    try {
      setLoading(true);
      const res = await fetch("/api/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (imgurl) {
      const timeout = setTimeout(() => fetchOCR(), 300);
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [imgurl]);

  useEffect(() => {
    if (ocrResult) {
      fetchResponse(ocrResult);
    }
  }, [ocrResult]);

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

  useEffect(() => {
    if (displayedText) {
      textAreaRef.current?.scrollTo({
        top: textAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedText]);
  return (
    <div className="w-full mt-6">
      {/* Main Section */}
      <div className="w-full min-h-screen flex flex-col items-center">
        {/* Image & Input Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Image Upload Box */}
          <div className="w-[30vmax] h-[30vmax] bg-red-50 rounded-2xl flex items-center justify-center shadow-md">
            <UploadImage
              setOcrResult={setOcrResult}
              setResponse={setResponse}
              imgurl={imgurl}
              handleUpload={handleUpload}
              loading={loading}
            />
          </div>

          {/* Question Input Box */}
          <div className="w-[30vmax] h-[30vmax] rounded-2xl shadow-lg">
            <div className="p-6 h-full w-full rounded-xl border-2 border-dashed border-red-400 bg-white space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {ocrResult ? "Extracted Question:" : "Ask Your Question"}
              </h2>
              <textarea
                ref={textAreaRef}
                className="w-full p-3 min-h-[70%] max-h-48 border border-blue-400 bg-white text-gray-800 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={displayedText}
                placeholder="Type your question here..."
                onChange={(e) => setDisplayedText(e.target.value)}
              />
              <button
                onClick={() => fetchResponse(displayedText)}
                className="w-full bg-red-500 transition duration-300 ease-in-out hover:bg-red-400 py-3 rounded-lg text-white font-semibold shadow-md cursor-pointer hover:text-black"
              >
                {loading
                  ? "Loading..."
                  : ocrResult
                  ? "Update the Question"
                  : "Ask Now"}
              </button>
            </div>
          </div>
        </section>

        {/* Response Section */}
        <section className="w-full flex justify-center pt-5">
          <ExplanationCard loading={loading} data={response} />
        </section>
      </div>
    </div>
  );
}

export default UserInteraction;
