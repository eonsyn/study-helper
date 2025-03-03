"use client";

import "cropperjs/dist/cropper.css";
import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import { FaUpload } from "react-icons/fa";

export default function CropImage({ imageSrc, setImageSrc, handleUpload }) {
  const cropperRef = useRef(null);
  const [cropWidth, setCropWidth] = useState(200);
  const [cropHeight, setCropHeight] = useState(200);
  const [croppedFile, setCroppedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-crop when image loads or crop area changes
  useEffect(() => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setTimeout(handleCropImage, 500); // Delay ensures cropper is ready
    }
  }, [imageSrc, cropWidth, cropHeight]);

  const handleCropImage = () => {
    if (!cropperRef.current) return;
    setIsLoading(true);
    setError(null);

    try {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      if (!croppedCanvas) throw new Error("Cropping failed");

      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "cropped-image.png", {
            type: "image/png",
          });
          setCroppedFile(file);
          setIsLoading(false);
        } else {
          setError("Failed to crop the image. Please try again.");
        }
      }, "image/png");
    } catch (err) {
      console.error("Error cropping image:", err);
      setError("Failed to crop the image. Please try again.");
      setIsLoading(false);
    }
  };

  // Auto-trigger cropping when the crop area is changed
  const onCrop = () => {
    if (cropperRef.current) {
      handleCropImage();
    }
  };

  const handleUploadImage = async () => {
    if (!croppedFile) return;
    setIsLoading(true);
    const fileEvent = { target: { files: [croppedFile] } };
    await handleUpload(fileEvent);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6   h-full   rounded-xl shadow-lg w-full  ">
      {/* Image Cropper */}
      <div className="relative  min-h-[60%]rounded-lg overflow-hidden w-full  ">
        <Cropper
          ref={cropperRef}
          src={imageSrc}
          style={{ height: "100%", width: "100%" }}
          initialAspectRatio={NaN}
          aspectRatio={NaN}
          viewMode={1}
          guides={true} // Show crop guides
          background={false}
          autoCropArea={1}
          scalable={false}
          cropBoxResizable={true} // Allow resizing the crop box
          cropBoxMovable={true} // Allow moving the crop box
          dragMode="move" // Allow dragging the image
          crop={onCrop} // Auto-trigger crop when selection changes
        />
      </div>

      {/* Crop Controls */}
      <div className="w-full flex items-center justify-evenly pt-1     ">
        <div className="widthcrop  ">
          <label className="block text-sm font-medium text-softMint mb-2">
            Adjust Crop Width
          </label>

          <input
            type="number"
            min={100}
            max={450}
            step={10}
            value={cropWidth}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (!isNaN(newValue) && newValue >= 100 && newValue <= 450) {
                setCropWidth(newValue);
                cropperRef.current?.cropper.setCropBoxData({
                  width: newValue,
                  height: cropHeight,
                });
              }
            }}
            style={{
              width: "80px",
              padding: "5px",
              fontSize: "16px",
              color: "#040D12", // Dark
              backgroundColor: "#93B1A6", // Soft Mint
              border: "1px solid #5C8374", // Moss
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
        </div>
        <div className="heightbutton ">
          <label className="block text-sm font-medium text-softMint mb-2">
            Adjust Crop Height
          </label>

          <input
            type="number"
            step={10}
            value={cropHeight}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (!isNaN(newValue) && newValue >= 100 && newValue <= 400) {
                setCropHeight(newValue);
                cropperRef.current?.cropper.setCropBoxData({
                  width: cropWidth,
                  height: newValue,
                });
              }
            }}
            style={{
              width: "80px",
              padding: "5px",
              fontSize: "16px",
              color: "#040D12", // Dark
              backgroundColor: "#93B1A6", // Soft Mint
              border: "1px solid #5C8374", // Moss
              borderRadius: "5px",
              textAlign: "center",
            }}
          />
        </div>
      </div>
      {/* Upload Button */}
      <div className="flex pt-1 gap-4">
        <button
          onClick={handleUploadImage}
          disabled={!croppedFile}
          className="px-4 py-2 flex items-center cursor-pointer gap-2 font-semibold rounded-lg shadow-md transition 
    bg-softMint text-slate-700 hover:text-slate-800  bg-red-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <FaUpload /> Upload{" "}
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
