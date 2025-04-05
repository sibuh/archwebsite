'use client';
import { useState } from 'react';
import { addToast} from '@heroui/react';
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
    title: '',
    description: '',
    client:'',
    location:'',
    year: new Date().getFullYear().toString(),    
    size: '',    
    typology: '',
    category:'',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [videos,setVideos]=useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category',formData.category);
    data.append('client', formData.client);
    data.append('location', formData.location);
    data.append('size',formData.size);
    data.append('typology', formData.typology);
    data.append('year', formData.year);
    
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
      console.log("uploaded project:",result)
      addToast({
        title:'Upload',
        description:'Upload successful!',
        color:"success"
      })
    } catch (error) {
      console.error(error);
      addToast({
        title:'Upload',
        description:'Upload failed',
        color:"danger"
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto my-4 p-5 bg-white
     rounded-md shadow-lg" >
      <h1 className="text-2xl font-bold mb-4">Post Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="client"
          className="w-full p-2 border rounded"
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="location"
          className="w-full p-2 border rounded"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="size"
          className="w-full p-2 border rounded"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="typology"
          className="w-full p-2 border rounded "
          value={formData.typology}
          onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
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
          className="px-4 py-2 bg-blue-500 text-white mx-auto
           rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
        {loading ? 'Uploading...' : 'Upload'}
        </button>
        
      </form>
    </div>
  );
}
