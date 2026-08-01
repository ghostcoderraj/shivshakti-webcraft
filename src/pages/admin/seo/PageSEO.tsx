import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Pencil, Loader2, Globe, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface PageSEO {
  id: string;
  page_slug: string;
  page_name: string;
  meta_title: string | null;
  meta_description: string | null;
  focus_keywords: string | null;
  canonical_url: string | null;
  is_indexed: boolean;
  og_title: string | null;
  og_image: string | null;
  enable_schema: boolean;
  created_at: string;
}

export default function AdminPageSEO() {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    meta_title: '',
    meta_description: '',
    focus_keywords: '',
    canonical_url: '',
    is_indexed: true,
    og_title: '',
    og_image: '',
    enable_schema: true,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('page_seo')
      .select('*')
      .order('page_name', { ascending: true });

    if (error) {
      toast.error('Failed to load page SEO settings');
      console.error(error);
    } else {
      setPages(data || []);
    }
    setIsLoading(false);
  };

  const openEditDialog = (page: PageSEO) => {
    setEditingPage(page);
    setForm({
      meta_title: page.meta_title || '',
      meta_description: page.meta_description || '',
      focus_keywords: page.focus_keywords || '',
      canonical_url: page.canonical_url || '',
      is_indexed: page.is_indexed,
      og_title: page.og_title || '',
      og_image: page.og_image || '',
      enable_schema: page.enable_schema,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setIsSaving(true);

    const seoData = {
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      focus_keywords: form.focus_keywords || null,
      canonical_url: form.canonical_url || null,
      is_indexed: form.is_indexed,
      og_title: form.og_title || null,
      og_image: form.og_image || null,
      enable_schema: form.enable_schema,
    };

    try {
      const { error } = await supabase
        .from('page_seo')
        .update(seoData)
        .eq('id', editingPage.id);

      if (error) throw error;

      toast.success('Page SEO updated successfully');
      setIsDialogOpen(false);
      fetchPages();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
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
      <div>
        <h1 className="text-2xl font-bold">Page-wise SEO</h1>
        <p className="text-muted-foreground">Configure SEO settings for each page</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Meta Title</TableHead>
                <TableHead>Indexed</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{page.page_name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{page.page_slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {page.meta_title || <span className="text-muted-foreground">Not set</span>}
                  </TableCell>
                  <TableCell>
                    {page.is_indexed ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    {page.enable_schema ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {pages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No pages configured
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Page SEO: {editingPage?.page_name}</DialogTitle>
            <DialogDescription>
              Configure SEO settings for {editingPage?.page_slug}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={form.meta_title}
                onChange={(e) => setForm(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="Page title for search engines"
              />
              <p className="text-xs text-muted-foreground">
                {form.meta_title.length}/60 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={form.meta_description}
                onChange={(e) => setForm(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="Page description for search engines..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {form.meta_description.length}/160 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="focus_keywords">Focus Keywords</Label>
              <Input
                id="focus_keywords"
                value={form.focus_keywords}
                onChange={(e) => setForm(prev => ({ ...prev, focus_keywords: e.target.value }))}
                placeholder="primary keyword, secondary keyword..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                value={form.canonical_url}
                onChange={(e) => setForm(prev => ({ ...prev, canonical_url: e.target.value }))}
                placeholder="https://yourdomain.com/page"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Open Graph</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="og_title">OG Title</Label>
                  <Input
                    id="og_title"
                    value={form.og_title}
                    onChange={(e) => setForm(prev => ({ ...prev, og_title: e.target.value }))}
                    placeholder="Title for social media sharing"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="og_image">OG Image URL</Label>
                  <Input
                    id="og_image"
                    value={form.og_image}
                    onChange={(e) => setForm(prev => ({ ...prev, og_image: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Indexing Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Index this page</Label>
                    <p className="text-xs text-muted-foreground">Allow search engines to index this page</p>
                  </div>
                  <Switch
                    checked={form.is_indexed}
                    onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_indexed: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Schema Markup</Label>
                    <p className="text-xs text-muted-foreground">Add structured data for rich snippets</p>
                  </div>
                  <Switch
                    checked={form.enable_schema}
                    onCheckedChange={(checked) => setForm(prev => ({ ...prev, enable_schema: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
