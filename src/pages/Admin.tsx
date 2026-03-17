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
  longDescription?: string;
  highlights?: string[];
  included?: string[];
  location?: string;
  date?: string;
  price: string;
  category: 'destination' | 'offer' | 'relocation' | 'event' | 'hero';
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
    longDescription: '',
    highlights: [],
    included: [],
    location: '',
    date: '',
    price: '',
    category: 'destination',
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
      longDescription: formData.longDescription || '',
      highlights: formData.highlights || [],
      included: formData.included || [],
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
    setFormData({ title: '', description: '', location: '', date: '', price: '', category: 'destination', image: '', images: [] });
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
      longDescription: p.longDescription || '',
      highlights: p.highlights || [],
      included: p.included || [],
      location: p.location,
      date: p.date,
      price: p.price,
      category: p.category,
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
      <section className="pt-40 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-4 block">Management Console</span>
              <h1 className="text-4xl md:text-6xl font-luxury text-[#1B2A4A] mb-4">Admin <span className="italic">Dashboard</span></h1>
              <div className="w-20 h-1 bg-[#C17F59] mb-4 rounded-full mx-auto md:mx-0" />
              <p className="text-muted-foreground font-serif italic">Curate your portfolio of exceptional sanctuaries and offers.</p>
            </div>
            <Button 
              className="rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 px-10 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 shadow-xl"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', location: '', date: '', price: '', category: 'destination', image: '', images: [] });
                setShowUploadForm(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" /> CREATE NEW ENTRY
            </Button>
          </div>

          {showUploadForm && (
            <div className="fixed inset-0 z-[100] bg-[#1B2A4A]/80 backdrop-blur-md flex items-center justify-center p-4">
              <form onSubmit={handleSubmit} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 rounded-luxury shadow-2xl space-y-10 relative scrollbar-hide">
                <button 
                  type="button" 
                  className="absolute top-6 right-6 text-[#1B2A4A]/40 hover:text-[#1B2A4A] transition-colors"
                  onClick={() => setShowUploadForm(false)}
                >
                  <X className="h-8 w-8" />
                </button>

                <div className="text-center">
                  <h2 className="text-3xl font-luxury text-[#1B2A4A] mb-4">{editingId ? 'Edit' : 'Create'} <span className="italic">Collection Item</span></h2>
                  <div className="w-16 h-1 bg-[#C17F59] mx-auto rounded-full" />
                </div>

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

                {/* Selection Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Category *</label>
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-6 py-4 rounded-full bg-gray-50 border border-transparent focus:bg-white focus:border-[#C17F59] focus:ring-4 focus:ring-[#C17F59]/10 transition-all outline-none text-sm appearance-none"
                    >
                      <option value="destination">Destination</option>
                      <option value="offer">Special Offer</option>
                      <option value="relocation">Relocation Service</option>
                      <option value="event">Event</option>
                      <option value="hero">Hero Slide</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Price *</label>
                    <Input placeholder="e.g. From KShs 312,000" className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.price} onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))} required />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Title *</label>
                  <Input placeholder="Extraordinary Title" className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Description * (Short)</label>
                  <Textarea placeholder="The short summary..." className="rounded-3xl p-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all min-h-[100px]" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} required />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Long Description (Detail Page)</label>
                  <Textarea placeholder="The extensive narrative..." className="rounded-3xl p-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all min-h-[180px]" value={formData.longDescription} onChange={e => setFormData(prev => ({ ...prev, longDescription: e.target.value }))} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Highlights (Comma Separated)</label>
                    <Input placeholder="Professional guide, Morning drives, etc." className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.highlights?.join(', ')} onChange={e => setFormData(prev => ({ ...prev, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">What's Included (Comma Separated)</label>
                    <Input placeholder="All meals, Airport transfers, etc." className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.included?.join(', ')} onChange={e => setFormData(prev => ({ ...prev, included: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Location</label>
                    <Input placeholder="e.g. Maasai Mara, Kenya" className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.location} onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1B2A4A]">Duration / Date</label>
                    <Input placeholder="e.g. 5 Days Safari" className="rounded-full py-6 px-8 bg-gray-50 border-transparent focus:bg-white focus:border-[#C17F59] transition-all" value={formData.date} onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))} />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="flex-1 rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 text-xs font-bold tracking-[0.3em] uppercase transition-all shadow-xl">
                    <Upload className="h-4 w-4 mr-2" /> {editingId ? 'COMMIT CHANGES' : 'PUBLISH ENTRY'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Poster Grid */}
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-luxury text-[#1B2A4A] uppercase tracking-tight">Active <span className="italic">Collection</span></h2>
              <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{posters.length} Entries Total</div>
            </div>

            {posters.length === 0 ? (
              <div className="bg-[#F9F9F9] py-32 rounded-luxury border border-dashed border-gray-100 text-center">
                <p className="text-muted-foreground font-serif italic text-lg">No treasures found yet. Create your first entry.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {posters.map(p => (
                  <div key={p.id} className="bg-white rounded-luxury overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-[#1B2A4A]/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-bold tracking-widest uppercase">{p.category}</div>
                      <div className="absolute top-4 right-4 bg-[#C17F59] text-[#1B2A4A] px-3 py-1 rounded-full text-[10px] font-bold">{p.price}</div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="font-luxury font-bold text-xl mb-4 text-[#1B2A4A] line-clamp-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-serif italic flex-1">{p.description}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="p-2 rounded-full hover:bg-[#1B2A4A] hover:text-white transition-all">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 rounded-full hover:bg-destructive hover:text-white transition-all">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Updated {new Date(p.createdAt).toLocaleDateString()}</span>
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
