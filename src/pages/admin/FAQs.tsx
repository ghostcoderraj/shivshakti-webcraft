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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  page_slug: string | null;
  enable_schema: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const PAGE_OPTIONS = [
  { value: '/', label: 'Home' },
  { value: '/about', label: 'About' },
  { value: '/products', label: 'Products' },
  { value: '/contact', label: 'Contact' },
  { value: '/why-choose-us', label: 'Why Choose Us' },
];

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    question: '',
    answer: '',
    page_slug: '',
    enable_schema: true,
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to load FAQs');
      console.error(error);
    } else {
      setFaqs(data || []);
    }
    setIsLoading(false);
  };

  const openEditDialog = (faq: FAQ) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      page_slug: faq.page_slug || '',
      enable_schema: faq.enable_schema,
      sort_order: faq.sort_order,
      is_active: faq.is_active,
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingFaq(null);
    setForm({
      question: '',
      answer: '',
      page_slug: '',
      enable_schema: true,
      sort_order: faqs.length,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.question || !form.answer) {
      toast.error('Question and answer are required');
      return;
    }

    setIsSaving(true);

    const faqData = {
      question: form.question,
      answer: form.answer,
      page_slug: form.page_slug || null,
      enable_schema: form.enable_schema,
      sort_order: form.sort_order,
      is_active: form.is_active,
    };

    try {
      if (editingFaq) {
        const { error } = await supabase
          .from('faqs')
          .update(faqData)
          .eq('id', editingFaq.id);

        if (error) throw error;
        toast.success('FAQ updated successfully');
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([faqData]);

        if (error) throw error;
        toast.success('FAQ created successfully');
      }

      setIsDialogOpen(false);
      fetchFaqs();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete FAQ');
    } else {
      toast.success('FAQ deleted');
      fetchFaqs();
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase.from('faqs').update({ is_active: isActive }).eq('id', id);
    if (!error) fetchFaqs();
  };

  const getPageLabel = (slug: string | null) => {
    if (!slug) return 'All Pages';
    return PAGE_OPTIONS.find(p => p.value === slug)?.label || slug;
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
          <h1 className="text-2xl font-bold">FAQs</h1>
          <p className="text-muted-foreground">Manage frequently asked questions with schema markup</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Schema</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>
                    <p className="font-medium line-clamp-2">{faq.question}</p>
                  </TableCell>
                  <TableCell>{getPageLabel(faq.page_slug)}</TableCell>
                  <TableCell>
                    {faq.enable_schema ? (
                      <span className="text-green-600 text-sm">Enabled</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">Disabled</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={faq.is_active}
                      onCheckedChange={(checked) => toggleActive(faq.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(faq)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {faqs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No FAQs found. Create your first FAQ.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* FAQ Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingFaq ? 'Edit FAQ' : 'New FAQ'}</DialogTitle>
            <DialogDescription>
              {editingFaq ? 'Update FAQ details' : 'Create a new FAQ entry'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                value={form.question}
                onChange={(e) => setForm(prev => ({ ...prev, question: e.target.value }))}
                placeholder="What is your question?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={form.answer}
                onChange={(e) => setForm(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Provide a detailed answer..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="page_slug">Assign to Page</Label>
                <Select 
                  value={form.page_slug} 
                  onValueChange={(v) => setForm(prev => ({ ...prev, page_slug: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All pages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Pages</SelectItem>
                    {PAGE_OPTIONS.map((page) => (
                      <SelectItem key={page.value} value={page.value}>{page.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="enable_schema"
                  checked={form.enable_schema}
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, enable_schema: checked }))}
                />
                <Label htmlFor="enable_schema">Enable FAQ Schema</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={form.is_active}
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingFaq ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
