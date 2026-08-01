import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Loader2, Upload, Image as ImageIcon, Search, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface MediaFile {
  id: string;
  file_name: string;
  original_name: string | null;
  file_url: string;
  alt_text: string | null;
  file_size: number | null;
  mime_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export default function AdminMedia() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [editAlt, setEditAlt] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load media files');
      console.error(error);
    } else {
      setFiles(data || []);
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Generate SEO-friendly filename
      const ext = file.name.split('.').pop();
      const baseName = file.name.replace(/\.[^/.]+$/, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const fileName = `${baseName}-${Date.now()}.${ext}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Create media record
      const { error: insertError } = await supabase
        .from('media')
        .insert([{
          file_name: fileName,
          original_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type,
        }]);

      if (insertError) throw insertError;

      toast.success('File uploaded successfully');
      fetchFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([file.file_name]);

      if (storageError) console.warn('Storage delete warning:', storageError);

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      toast.success('File deleted');
      setSelectedFile(null);
      fetchFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete file');
    }
  };

  const updateAltText = async () => {
    if (!selectedFile) return;

    const { error } = await supabase
      .from('media')
      .update({ alt_text: editAlt })
      .eq('id', selectedFile.id);

    if (error) {
      toast.error('Failed to update alt text');
    } else {
      toast.success('Alt text updated');
      fetchFiles();
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredFiles = files.filter(f =>
    f.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.original_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage images and files</p>
        </div>
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUpload}
            accept="image/*"
            disabled={isUploading}
          />
          <Button disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => (
          <Card
            key={file.id}
            className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            onClick={() => {
              setSelectedFile(file);
              setEditAlt(file.alt_text || '');
            }}
          >
            <CardContent className="p-2">
              {file.mime_type?.startsWith('image/') ? (
                <img
                  src={file.file_url}
                  alt={file.alt_text || file.file_name}
                  className="w-full aspect-square object-cover rounded"
                />
              ) : (
                <div className="w-full aspect-square bg-muted rounded flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <p className="text-xs mt-2 truncate">{file.file_name}</p>
              {!file.alt_text && (
                <Badge variant="destructive" className="text-[10px] mt-1">No alt text</Badge>
              )}
            </CardContent>
          </Card>
        ))}
        {filteredFiles.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No files found
          </div>
        )}
      </div>

      {/* File Detail Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>

          {selectedFile && (
            <div className="space-y-4">
              {selectedFile.mime_type?.startsWith('image/') && (
                <img
                  src={selectedFile.file_url}
                  alt={selectedFile.alt_text || selectedFile.file_name}
                  className="w-full max-h-[300px] object-contain rounded bg-muted"
                />
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">File Name</p>
                  <p className="font-medium truncate">{selectedFile.file_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{formatFileSize(selectedFile.file_size)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedFile.mime_type || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uploaded</p>
                  <p className="font-medium">{format(new Date(selectedFile.created_at), 'MMM d, yyyy')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL</Label>
                <div className="flex gap-2">
                  <Input value={selectedFile.file_url} readOnly className="text-xs" />
                  <Button variant="outline" size="icon" onClick={() => copyUrl(selectedFile.file_url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt_text">Alt Text (SEO)</Label>
                <div className="flex gap-2">
                  <Input
                    id="alt_text"
                    value={editAlt}
                    onChange={(e) => setEditAlt(e.target.value)}
                    placeholder="Descriptive alt text for SEO"
                  />
                  <Button variant="secondary" onClick={updateAltText}>Save</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="destructive" onClick={() => handleDelete(selectedFile)}>
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
