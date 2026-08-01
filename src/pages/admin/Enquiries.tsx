import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Eye, Trash2, Download, Mail, Phone, Building, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Enquiry {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  company_name: string | null;
  city: string | null;
  state: string | null;
  product_interested: string | null;
  message: string | null;
  source: 'form' | 'whatsapp' | 'call';
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load enquiries');
      console.error(error);
    } else {
      setEnquiries(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: 'new' | 'contacted' | 'closed') => {
    const { error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      fetchEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(prev => prev ? { ...prev, status } : null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    const { error } = await supabase.from('enquiries').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete enquiry');
    } else {
      toast.success('Enquiry deleted');
      setSelectedEnquiry(null);
      fetchEnquiries();
    }
  };

  const exportToExcel = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'City', 'State', 'Product', 'Message', 'Source', 'Status', 'Date'];
    const rows = enquiries.map(e => [
      e.name,
      e.email || '',
      e.phone || '',
      e.company_name || '',
      e.city || '',
      e.state || '',
      e.product_interested || '',
      e.message || '',
      e.source,
      e.status,
      format(new Date(e.created_at), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Enquiries exported');
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone?.includes(searchQuery) ||
      e.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold">Enquiries</h1>
          <p className="text-muted-foreground">Manage customer enquiries and leads</p>
        </div>
        <Button onClick={exportToExcel} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{enquiry.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        {enquiry.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {enquiry.email}
                          </span>
                        )}
                        {enquiry.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {enquiry.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{enquiry.product_interested || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{enquiry.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={enquiry.status} onValueChange={(v) => updateStatus(enquiry.id, v as any)}>
                      <SelectTrigger className={`w-[110px] h-7 text-xs ${getStatusColor(enquiry.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(enquiry.created_at), 'MMM d, yyyy')}
                    <br />
                    <span className="text-xs">{format(new Date(enquiry.created_at), 'h:mm a')}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedEnquiry(enquiry)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(enquiry.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEnquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No enquiries found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Enquiry Detail Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={(open) => !open && setSelectedEnquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Received on {selectedEnquiry && format(new Date(selectedEnquiry.created_at), 'MMMM d, yyyy h:mm a')}
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedEnquiry.company_name || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-primary hover:underline">
                    {selectedEnquiry.email || '-'}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-medium text-primary hover:underline">
                    {selectedEnquiry.phone || '-'}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{selectedEnquiry.city || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{selectedEnquiry.state || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Product Interested</p>
                <p className="font-medium">{selectedEnquiry.product_interested || 'General Enquiry'}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="font-medium bg-muted p-3 rounded-lg">{selectedEnquiry.message || 'No message'}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{selectedEnquiry.source}</Badge>
                  <Select 
                    value={selectedEnquiry.status} 
                    onValueChange={(v) => updateStatus(selectedEnquiry.id, v as any)}
                  >
                    <SelectTrigger className={`w-[110px] h-8 ${getStatusColor(selectedEnquiry.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedEnquiry.id)}>
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
