import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Upload, Plus, X, ImagePlus } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getPosters, addPoster, updatePoster, deletePoster } from '@/lib/posterStorage';
import { Poster } from '@/types/poster';

type FormData = {
  title: string;
  description: string;
  location?: string;
  date?: string;
  price: string;
  image: string;
  images?: string[];
};

const Admin = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    location: '',
    date: '',
    price: '',
    image: '',
    images: [],
  });
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosters(getPosters());
  }, []);

  // --------------------------
  // Helper: Read files as Data URL
  // --------------------------
  const readFilesAsDataURL = (files: FileList | null, callback: (results: string[]) => void) => {
    if (!files) return;
    const results: string[] = [];
    let processed = 0;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        results.push(reader.result as string);
        processed++;
        if (processed === files.length) callback(results);
      };
      reader.readAsDataURL(file);
    });
  };

  // --------------------------
  // Cover Image
  // --------------------------
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    readFilesAsDataURL(e.target.files, ([first]) => {
      if (first) setFormData(prev => ({ ...prev, image: first }));
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    readFilesAsDataURL(e.dataTransfer.files, ([first]) => {
      if (first) setFormData(prev => ({ ...prev, image: first }));
    });
  };

  // --------------------------
  // Additional Images
  // --------------------------
  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = formData.images || [];
    if (!e.target.files) return;
    const remainingSlots = 6 - currentImages.length;
    const filesToProcess = Array.from(e.target.files).slice(0, remainingSlots);

    readFilesAsDataURL(filesToProcess as unknown as FileList, newImages => {
      setFormData(prev => ({ ...prev, images: [...currentImages, ...newImages] }));
      toast.success(`${newImages.length} photo(s) added!`);
    });
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== index) }));
  };

  // --------------------------
  // Submit Form
  // --------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.price.trim() || !formData.image) {
      return toast.error('Fill required fields and add a cover image.');
    }

    const poster: Poster = {
      ...formData,
      id: editingId || crypto.randomUUID(),
      images: formData.images || [],
      location: formData.location || '',
      date: formData.date || '',
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      updatePoster(editingId, poster);
      toast.success('Updated!');
      setEditingId(null);
    } else {
      addPoster(poster);
      toast.success('Poster added!');
    }

    setPosters(getPosters());
    setFormData({ title: '', description: '', location: '', date: '', price: '', image: '', images: [] });
    setShowUploadForm(false);
  };

  // --------------------------
  // Edit / Delete
  // --------------------------
  const handleEdit = (p: Poster) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      description: p.description,
      location: p.location,
      date: p.date,
      price: p.price,
      image: p.image,
      images: p.images || [],
    });
    setShowUploadForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete?')) return;
    deletePoster(id);
    setPosters(getPosters());
    toast.success('Deleted!');
  };

  // --------------------------
  // Render
  // --------------------------
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-4">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage posters</p>
            </div>
            <Button className="btn-pill" onClick={() => setShowUploadForm(true)}>
              <Plus className="h-5 w-5 mr-2" />Add Poster
            </Button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-lg mb-12 space-y-6">
              <h2 className="text-2xl font-heading font-bold mb-6">{editingId ? 'Edit Destination' : 'Upload Destination'}</h2>

              {/* Cover Image */}
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="relative border-2 border-dashed border-primary rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition"
              >
                {formData.image ? (
                  <img src={formData.image} alt="Cover" className="w-64 h-40 object-cover rounded-lg" />
                ) : (
                  <p className="text-center text-muted-foreground">▢▢▢ Drag & Drop Cover Image or click to upload</p>
                )}

                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onClick={e => e.stopPropagation()}
                  onChange={handleCoverUpload}
                />
              </div>

              {/* Additional Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Additional Photos ({formData.images?.length || 0}/6)</label>
                  {(formData.images?.length || 0) < 6 && (
                    <label className="cursor-pointer">
                      <Button type="button" size="sm" variant="ghost" asChild>
                        <span><ImagePlus className="h-4 w-4 mr-1" />Add</span>
                      </Button>
                      <Input type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalImagesUpload} />
                    </label>
                  )}
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                        <button type="button" onClick={() => removeAdditionalImage(idx)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <Input placeholder="Title *" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
              <Textarea placeholder="Description *" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={4} required />
              <Input placeholder="Location" value={formData.location} onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))} />
              <Input placeholder="Date" value={formData.date} onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))} />
              <Input placeholder="Price *" value={formData.price} onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))} required />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1"><Upload className="h-4 w-4 mr-2" />{editingId ? 'Update' : 'Upload'}</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => {
                  setShowUploadForm(false);
                  setEditingId(null);
                  setFormData({ title: '', description: '', location: '', date: '', price: '', image: '', images: [] });
                }}>Cancel</Button>
              </div>
            </form>
          )}

          {/* Poster Grid */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-6">Destinations ({posters.length})</h2>
            {posters.length === 0 ? (
              <div className="bg-muted p-12 rounded-xl text-center">
                <p className="text-muted-foreground">No destinations yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posters.map(p => (
                  <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-48">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">{p.price}</div>
                      {p.images && p.images.length > 0 && (
                        <div className="absolute bottom-3 left-3 bg-background/80 text-foreground px-2 py-1 rounded-full text-xs">+{p.images.length} photos</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
                      {p.location && <p className="text-xs text-muted-foreground mb-2">📍 {p.location}</p>}
                      <p className="text-xs text-accent mb-4">{p.date}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(p)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                        <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
