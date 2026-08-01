import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Eye, Trash2, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface QuoteRequest {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_company: string | null;
  product_id: string | null;
  quantity: number | null;
  special_requirements: string | null;
  admin_notes: string | null;
  status: 'pending' | 'sent' | 'closed';
  created_at: string;
  updated_at: string;
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [quotesRes, productsRes] = await Promise.all([
      supabase.from('quote_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('id, name'),
    ]);

    if (quotesRes.error) console.error(quotesRes.error);
    if (productsRes.error) console.error(productsRes.error);

    setQuotes(quotesRes.data || []);
    setProducts(productsRes.data || []);
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: 'pending' | 'sent' | 'closed') => {
    const { error } = await supabase
      .from('quote_requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchData();
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedQuote) return;

    const { error } = await supabase
      .from('quote_requests')
      .update({ admin_notes: adminNotes })
      .eq('id', selectedQuote.id);

    if (error) {
      toast.error('Failed to save notes');
    } else {
      toast.success('Notes saved');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    const { error } = await supabase.from('quote_requests').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete quote');
    } else {
      toast.success('Quote deleted');
      setSelectedQuote(null);
      fetchData();
    }
  };

  const getProductName = (productId: string | null) => {
    if (!productId) return 'General';
    return products.find(p => p.id === productId)?.name || 'Unknown';
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer_company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return '';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quote Requests</h1>
          <p className="text-muted-foreground">Manage customer quote requests</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{quote.customer_company || 'No company'}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getProductName(quote.product_id)}</TableCell>
                  <TableCell>{quote.quantity || '-'}</TableCell>
                  <TableCell>
                    <Select value={quote.status} onValueChange={(v) => updateStatus(quote.id, v as any)}>
                      <SelectTrigger className={`w-[100px] h-7 text-xs ${getStatusColor(quote.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(quote.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          setSelectedQuote(quote);
                          setAdminNotes(quote.admin_notes || '');
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(quote.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredQuotes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No quote requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quote Detail Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={(open) => !open && setSelectedQuote(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Quote Request Details</DialogTitle>
            <DialogDescription>
              Received on {selectedQuote && format(new Date(selectedQuote.created_at), 'MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{selectedQuote.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedQuote.customer_company || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedQuote.customer_email}`} className="font-medium text-primary hover:underline">
                    {selectedQuote.customer_email || '-'}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${selectedQuote.customer_phone}`} className="font-medium text-primary hover:underline">
                    {selectedQuote.customer_phone || '-'}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Product</p>
                  <p className="font-medium">{getProductName(selectedQuote.product_id)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{selectedQuote.quantity || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Special Requirements</p>
                <p className="font-medium bg-muted p-3 rounded-lg">
                  {selectedQuote.special_requirements || 'No special requirements'}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this quote..."
                  rows={3}
                />
                <Button size="sm" onClick={saveAdminNotes}>Save Notes</Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Select 
                  value={selectedQuote.status} 
                  onValueChange={(v) => updateStatus(selectedQuote.id, v as any)}
                >
                  <SelectTrigger className={`w-[120px] ${getStatusColor(selectedQuote.status)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedQuote.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
