'use client';
import { useState } from 'react';
import { Button } from '@radix-ui/themes';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // price: '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [videos, setVideos] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    // data.append('price', formData.price);
    
    if (images) {
      Array.from(images).forEach((image) => {
        data.append('images', image);
      });
    }
    
    if (videos) {
      Array.from(videos).forEach((video) => {
        data.append('videos', video);
      });
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();
      alert('Upload successful!');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-8 items-center justify-items-center'>
      <h1>Post Project</h1>
      <form onSubmit={handleSubmit}
        className="flex flex-col w-2/3 space-y-4 min-h-screen"
      >
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <div>
          <label>Images </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            required
          />
        </div>
        <div>
          <label>Videos </label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => setVideos(e.target.files)}
          />
        </div>
        <Button
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
        {/* <button 
          type="submit" 
          disabled={loading}
          >
          {loading ? 'Uploading...' : 'Upload'}
        </button> */}
      </form>
    </div>
  );
}
