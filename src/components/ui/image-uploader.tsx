"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploaderProps {
  onChange: (base64Image: string | null) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  defaultImage?: string | null;
}

export default function ImageUploader({
  onChange,
  maxSizeMB = 2,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  defaultImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFile = (file: File) => {
    setError(null);
    if (!allowedTypes.includes(file.type)) {
      return setError("Only JPG, PNG, or WEBP images are allowed.");
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return setError(`Image must be smaller than ${maxSizeMB}MB.`);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {!preview ? (
        <div
          className="flex flex-col items-center justify-center p-6 text-gray-500 transition border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-blue-400 hover:text-blue-500"
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud className="w-8 h-8 mb-2" />
          <p className="text-sm">Click or drag an image here to upload</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="relative w-full max-w-xs">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full border rounded-lg shadow aspect-video"
          />
          <button
            onClick={removeImage}
            type="button"
            className="absolute p-1 text-white bg-red-500 rounded-full shadow top-2 right-2 hover:bg-red-600"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
