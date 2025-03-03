"use client";

import { useEffect, useState } from "react";
import CropImage from "./CropImage";

export default function UploadImage({
  handleUpload,
  loading,
  setResponse,
  setOcrResult,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      previewImage(file);

      // Reset file input so the same file can be selected again
      event.target.value = "";
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      previewImage(file);
    }
  };

  // Handle Paste Event
  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) {
          setSelectedFile(file);
          previewImage(file);
        }
      }
    }
  };

  // Attach Paste Listener
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Preview Image Function
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  // Handle Final Upload (after cropping)
  const handleFinalUpload = () => {
    if (croppedImage) {
      handleUpload({ target: { files: [croppedImage] } });
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center ">
      {/* Hidden File Input */}

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Drag & Drop Area */}
      {!imageSrc && (
        <div
          className={`w-full h-full border-red-500 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all cursor-pointer p-4 text-center shadow-md 
      ${
        isDragging ? "border-softMint bg-red-50" : "border-deepTeal  bg-white "
      }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="text-softMint font-medium cursor-pointer">
            Drag & Drop or Paste Image Here
          </label>
          <p className="text-sm text-moss mt-2">or</p>
          <label
            htmlFor="fileInput"
            className="px-6 py-2 bg-softMint text-dark font-semibold rounded-lg cursor-pointer hover:bg-red-100   bg-red-50 transition shadow-lg mt-2"
          >
            Choose File
          </label>
        </div>
      )}

      {/* Cropping Component */}
      {imageSrc && (
        <div className="  h-full w-full flex flex-col items-center  ">
          <CropImage
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            handleUpload={handleUpload}
            setCroppedFile={setCroppedImage}
          />
          <button
            onClick={() => {
              setImageSrc(null);
              setSelectedFile(null);
              setCroppedImage(null);
              setResponse(null);
              setOcrResult(null);
            }}
            className=" absolute top-1 right-1 h-6 w-6  flex items-center justify-center rounded-full cursor-pointer  p-2 bg-gray-500 text-red-100 hover:text-xl hover:text-red-500  hover:bg-gray-600 transition shadow-md"
          >
            x
          </button>
        </div>
      )}

      {/* Upload Button (Only after cropping) */}
      {croppedImage && (
        <button
          onClick={handleFinalUpload}
          className="px-6 py-2 bg-softMint text-dark font-semibold rounded-lg hover:bg-moss transition shadow-lg"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </div>
  );
}
