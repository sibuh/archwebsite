"use client";

import { useState, FormEvent } from "react";

export default function UploadForm() {
  const [images, setImages] = useState<FileList | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!images || !video) {
      alert("Please upload images and a video.");
      return;
    }

    const form = new FormData();
    
    // Add images to FormData
    Array.from(images).forEach((image, index) => {
      form.append("images", image);
    });
    
    // Add video to FormData
    form.append("video", video);
    
    // Add other form fields
    form.append("title", formData.title);
    form.append("description", formData.description);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Files uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />
      
      {/* Multiple Images Upload */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImages(e.target.files)}
        required
      />

      {/* Single Video Upload */}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files?.[0] || null)}
        required
      />

      <button type="submit">Upload</button>
    </form>
  );
}
