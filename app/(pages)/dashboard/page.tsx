'use client';
import { useState } from 'react';
const categories=[
  {
    label:'Architecture',
    category:'ARCHITECTURAL',
  },
  {
    label: 'Interior',
    category:'INTERIOR'
  },
  {
    label: 'Landscape',
    category:'LANDSCAPE'
  },
  {
    label: 'Structural',
    category:'STRUCTURAL'
  }
]
export default function UploadPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category:'',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [videos,setVideos]=useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category',formData.category);
    
    files.forEach(file => {
      data.append('files', file);
    });
    videos.forEach(video=>{
      data.append('videos',video);
    });
    console.log("data",data)

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        console.log("response",response)
        throw new Error('Upload failed');
      }
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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Post Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
          <select 
          className="w-full p-2 border rounded bg-white" 
          value={formData.category}
          onChange={(e)=>setFormData({...formData,category:e.target.value})}
          >
            <option value="" disabled  hidden >select category</option>
            {
              categories.map((category)=>
              <option
               key={category.category} 
               value={category.category}>{category.label}</option>)
            }
          </select>
     
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="file"
          multiple
          accept='image/*'
          className="w-full p-2 border rounded"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          required
        />
        <input
          type="file"
          multiple
          accept='video/*'
          className="w-full p-2 border rounded"
          onChange={(e) => setVideos(Array.from(e.target.files || []))}
          required
        />
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
