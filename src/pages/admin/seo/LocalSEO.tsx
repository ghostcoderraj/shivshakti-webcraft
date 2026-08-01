import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Plus, X, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface LocalSEO {
  id: string;
  service_locations: any;
  local_keywords: string | null;
  google_business_profile_url: string | null;
  nap_name: string | null;
  nap_address: string | null;
  nap_phone: string | null;
}

export default function AdminLocalSEO() {
  const [settings, setSettings] = useState<LocalSEO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newLocation, setNewLocation] = useState('');

  const [form, setForm] = useState({
    service_locations: [] as string[],
    local_keywords: '',
    google_business_profile_url: '',
    nap_name: '',
    nap_address: '',
    nap_phone: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('local_seo')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to load local SEO settings');
      console.error(error);
    }

    if (data) {
      setSettings(data);
      const locations = Array.isArray(data.service_locations) 
        ? (data.service_locations as string[]) 
        : [];
      setForm({
        service_locations: locations,
        local_keywords: data.local_keywords || '',
        google_business_profile_url: data.google_business_profile_url || '',
        nap_name: data.nap_name || '',
        nap_address: data.nap_address || '',
        nap_phone: data.nap_phone || '',
      });
    }
    setIsLoading(false);
  };

  const addLocation = () => {
    if (newLocation && !form.service_locations.includes(newLocation)) {
      setForm(prev => ({
        ...prev,
        service_locations: [...prev.service_locations, newLocation],
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    setForm(prev => ({
      ...prev,
      service_locations: prev.service_locations.filter(l => l !== location),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const seoData = {
      service_locations: form.service_locations,
      local_keywords: form.local_keywords || null,
      google_business_profile_url: form.google_business_profile_url || null,
      nap_name: form.nap_name || null,
      nap_address: form.nap_address || null,
      nap_phone: form.nap_phone || null,
    };

    try {
      if (settings) {
        const { error } = await supabase
          .from('local_seo')
          .update(seoData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('local_seo')
          .insert([seoData]);

        if (error) throw error;
      }

      toast.success('Local SEO settings saved successfully');
      fetchSettings();
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
        <h1 className="text-2xl font-bold">Local SEO Settings</h1>
        <p className="text-muted-foreground">Optimize your website for local search results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            NAP Consistency
          </CardTitle>
          <CardDescription>
            Name, Address, Phone - Keep these consistent across all platforms for better local SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nap_name">Business Name</Label>
            <Input
              id="nap_name"
              value={form.nap_name}
              onChange={(e) => setForm(prev => ({ ...prev, nap_name: e.target.value }))}
              placeholder="Your Business Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nap_address">Business Address</Label>
            <Textarea
              id="nap_address"
              value={form.nap_address}
              onChange={(e) => setForm(prev => ({ ...prev, nap_address: e.target.value }))}
              placeholder="Full business address..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nap_phone">Phone Number</Label>
            <Input
              id="nap_phone"
              value={form.nap_phone}
              onChange={(e) => setForm(prev => ({ ...prev, nap_phone: e.target.value }))}
              placeholder="+91-XXXXXXXXXX"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Locations</CardTitle>
          <CardDescription>
            Cities and regions where you provide services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {form.service_locations.map((location) => (
              <Badge key={location} variant="secondary" className="gap-1 pr-1">
                {location}
                <button
                  onClick={() => removeLocation(location)}
                  className="ml-1 hover:text-destructive p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add location (e.g., Ahmedabad, Gujarat)"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
            />
            <Button type="button" variant="secondary" onClick={addLocation}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local Keywords</CardTitle>
          <CardDescription>
            Keywords targeting your local audience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="local_keywords">Local SEO Keywords</Label>
            <Textarea
              id="local_keywords"
              value={form.local_keywords}
              onChange={(e) => setForm(prev => ({ ...prev, local_keywords: e.target.value }))}
              placeholder="plywood machinery Ahmedabad, wood working machine Gujarat, finger jointing machine India..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated keywords that include your service locations
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google Business Profile</CardTitle>
          <CardDescription>
            Link to your Google Business Profile for local visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="google_business_profile_url">Google Business Profile URL</Label>
            <Input
              id="google_business_profile_url"
              value={form.google_business_profile_url}
              onChange={(e) => setForm(prev => ({ ...prev, google_business_profile_url: e.target.value }))}
              placeholder="https://g.page/your-business"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
