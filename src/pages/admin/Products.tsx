import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Star, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  slug: string;
  product_code: string | null;
  category_id: string | null;
  short_description: string | null;
  long_description: string | null;
  specifications: any;
  applications: any;
  key_benefits: any;
  images: any;
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [form, setForm] = useState({
    name: '',
    slug: '',
    product_code: '',
    category_id: '',
    short_description: '',
    long_description: '',
    specifications: [] as { label: string; value: string }[],
    applications: [] as string[],
    key_benefits: [] as string[],
    images: [] as { url: string; alt: string }[],
    meta_title: '',
    meta_description: '',
    seo_keywords: '',
    is_featured: false,
    is_active: true,
    sort_order: 0,
  });

  const [newSpec, setNewSpec] = useState({ label: '', value: '' });
  const [newApplication, setNewApplication] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newImage, setNewImage] = useState({ url: '', alt: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      supabase.from('products').select('*').order('sort_order', { ascending: true }),
      supabase.from('product_categories').select('id, name, slug').eq('is_active', true),
    ]);

    if (productsRes.error) console.error(productsRes.error);
    if (categoriesRes.error) console.error(categoriesRes.error);

    setProducts(productsRes.data || []);
    setCategories(categoriesRes.data || []);
    setIsLoading(false);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      product_code: '',
      category_id: '',
      short_description: '',
      long_description: '',
      specifications: [],
      applications: [],
      key_benefits: [],
      images: [],
      meta_title: '',
      meta_description: '',
      seo_keywords: '',
      is_featured: false,
      is_active: true,
      sort_order: products.length,
    });
    setNewSpec({ label: '', value: '' });
    setNewApplication('');
    setNewBenefit('');
    setNewImage({ url: '', alt: '' });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      slug: product.slug,
      product_code: product.product_code || '',
      category_id: product.category_id || '',
      short_description: product.short_description || '',
      long_description: product.long_description || '',
      specifications: product.specifications || [],
      applications: product.applications || [],
      key_benefits: product.key_benefits || [],
      images: product.images || [],
      meta_title: product.meta_title || '',
      meta_description: product.meta_description || '',
      seo_keywords: product.seo_keywords || '',
      is_featured: product.is_featured,
      is_active: product.is_active,
      sort_order: product.sort_order,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingProduct(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const addSpec = () => {
    if (newSpec.label && newSpec.value) {
      setForm(prev => ({
        ...prev,
        specifications: [...prev.specifications, { ...newSpec }],
      }));
      setNewSpec({ label: '', value: '' });
    }
  };

  const removeSpec = (index: number) => {
    setForm(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const addApplication = () => {
    if (newApplication) {
      setForm(prev => ({
        ...prev,
        applications: [...prev.applications, newApplication],
      }));
      setNewApplication('');
    }
  };

  const removeApplication = (index: number) => {
    setForm(prev => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== index),
    }));
  };

  const addBenefit = () => {
    if (newBenefit) {
      setForm(prev => ({
        ...prev,
        key_benefits: [...prev.key_benefits, newBenefit],
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setForm(prev => ({
      ...prev,
      key_benefits: prev.key_benefits.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (newImage.url) {
      setForm(prev => ({
        ...prev,
        images: [...prev.images, { ...newImage }],
      }));
      setNewImage({ url: '', alt: '' });
    }
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }

    setIsSaving(true);

    const productData = {
      name: form.name,
      slug: form.slug,
      product_code: form.product_code || null,
      category_id: form.category_id || null,
      short_description: form.short_description || null,
      long_description: form.long_description || null,
      specifications: form.specifications,
      applications: form.applications,
      key_benefits: form.key_benefits,
      images: form.images,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      seo_keywords: form.seo_keywords || null,
      is_featured: form.is_featured,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Product created successfully');
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete product');
    } else {
      toast.success('Product deleted');
      fetchData();
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', id);
    if (!error) fetchData();
  };

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    const { error } = await supabase.from('products').update({ is_featured: isFeatured }).eq('id', id);
    if (!error) fetchData();
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product_code?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.images?.[0]?.url ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.images[0].alt || product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{product.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.product_code || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getCategoryName(product.category_id)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFeatured(product.id, !product.is_featured)}
                    >
                      <Star className={`h-4 w-4 ${product.is_featured ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={product.is_active}
                      onCheckedChange={(checked) => toggleActive(product.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Update product details' : 'Create a new product'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Automatic Band Saw Grinder"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product_code">Product Code / Model</Label>
                <Input
                  id="product_code"
                  value={form.product_code}
                  onChange={(e) => setForm(prev => ({ ...prev, product_code: e.target.value }))}
                  placeholder="e.g. SSE-ABSG"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="automatic-band-saw-grinder"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={form.category_id} 
                  onValueChange={(v) => setForm(prev => ({ ...prev, category_id: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={form.short_description}
                onChange={(e) => setForm(prev => ({ ...prev, short_description: e.target.value }))}
                placeholder="Brief product summary..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long_description">Long Description (SEO)</Label>
              <Textarea
                id="long_description"
                value={form.long_description}
                onChange={(e) => setForm(prev => ({ ...prev, long_description: e.target.value }))}
                placeholder="Detailed product description for SEO..."
                rows={4}
              />
            </div>

            {/* Specifications */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Technical Specifications</h4>
              <div className="space-y-2">
                {form.specifications.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="font-medium">{spec.label}:</span>
                    <span>{spec.value}</span>
                    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => removeSpec(i)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Label"
                    value={newSpec.label}
                    onChange={(e) => setNewSpec(prev => ({ ...prev, label: e.target.value }))}
                  />
                  <Input
                    placeholder="Value"
                    value={newSpec.value}
                    onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                  />
                  <Button type="button" variant="secondary" onClick={addSpec}>Add</Button>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Applications</h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {form.applications.map((app, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {app}
                      <button onClick={() => removeApplication(i)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add application"
                    value={newApplication}
                    onChange={(e) => setNewApplication(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addApplication())}
                  />
                  <Button type="button" variant="secondary" onClick={addApplication}>Add</Button>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Key Benefits</h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {form.key_benefits.map((benefit, i) => (
                    <Badge key={i} variant="outline" className="gap-1">
                      {benefit}
                      <button onClick={() => removeBenefit(i)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add benefit"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" variant="secondary" onClick={addBenefit}>Add</Button>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Product Images</h4>
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img.url} alt={img.alt} className="w-full aspect-square object-cover rounded" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(i)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Image URL"
                    value={newImage.url}
                    onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <Input
                    placeholder="Alt text (required)"
                    value={newImage.alt}
                    onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                  />
                  <Button type="button" variant="secondary" onClick={addImage}>Add</Button>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">SEO Settings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={form.meta_title}
                    onChange={(e) => setForm(prev => ({ ...prev, meta_title: e.target.value }))}
                    placeholder="SEO title (50-60 characters)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={form.meta_description}
                    onChange={(e) => setForm(prev => ({ ...prev, meta_description: e.target.value }))}
                    placeholder="SEO description (150-160 characters)"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo_keywords">SEO Keywords</Label>
                  <Input
                    id="seo_keywords"
                    value={form.seo_keywords}
                    onChange={(e) => setForm(prev => ({ ...prev, seo_keywords: e.target.value }))}
                    placeholder="Comma separated keywords"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={form.is_active}
                    onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_featured"
                    checked={form.is_featured}
                    onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_featured: checked }))}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
