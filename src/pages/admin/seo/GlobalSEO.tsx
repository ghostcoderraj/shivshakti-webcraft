import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface SEOSettings {
  id: string;
  default_meta_title: string | null;
  default_meta_description: string | null;
  default_keywords: string | null;
  google_analytics_id: string | null;
  google_search_console_verification: string | null;
}

export default function AdminGlobalSEO() {
  const [settings, setSettings] = useState<SEOSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    default_meta_title: '',
    default_meta_description: '',
    default_keywords: '',
    google_analytics_id: '',
    google_search_console_verification: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('seo_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      toast.error('Failed to load SEO settings');
      console.error(error);
    }

    if (data) {
      setSettings(data);
      setForm({
        default_meta_title: data.default_meta_title || '',
        default_meta_description: data.default_meta_description || '',
        default_keywords: data.default_keywords || '',
        google_analytics_id: data.google_analytics_id || '',
        google_search_console_verification: data.google_search_console_verification || '',
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const seoData = {
      default_meta_title: form.default_meta_title || null,
      default_meta_description: form.default_meta_description || null,
      default_keywords: form.default_keywords || null,
      google_analytics_id: form.google_analytics_id || null,
      google_search_console_verification: form.google_search_console_verification || null,
    };

    try {
      if (settings) {
        const { error } = await supabase
          .from('seo_settings')
          .update(seoData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('seo_settings')
          .insert([seoData]);

        if (error) throw error;
      }

      toast.success('SEO settings saved successfully');
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
        <h1 className="text-2xl font-bold">Global SEO Settings</h1>
        <p className="text-muted-foreground">Configure default SEO settings for your website</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Default Meta Tags</CardTitle>
          <CardDescription>These will be used as fallback when page-specific SEO is not set</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default_meta_title">Default Meta Title</Label>
            <Input
              id="default_meta_title"
              value={form.default_meta_title}
              onChange={(e) => setForm(prev => ({ ...prev, default_meta_title: e.target.value }))}
              placeholder="Your Website Title - Main Keywords"
            />
            <p className="text-xs text-muted-foreground">
              {form.default_meta_title.length}/60 characters (recommended: 50-60)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default_meta_description">Default Meta Description</Label>
            <Textarea
              id="default_meta_description"
              value={form.default_meta_description}
              onChange={(e) => setForm(prev => ({ ...prev, default_meta_description: e.target.value }))}
              placeholder="Brief description of your website for search engines..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {form.default_meta_description.length}/160 characters (recommended: 150-160)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default_keywords">Default Keywords</Label>
            <Textarea
              id="default_keywords"
              value={form.default_keywords}
              onChange={(e) => setForm(prev => ({ ...prev, default_keywords: e.target.value }))}
              placeholder="keyword1, keyword2, keyword3..."
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated list of primary keywords for your website
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google Integration</CardTitle>
          <CardDescription>Connect your website with Google services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
            <Input
              id="google_analytics_id"
              value={form.google_analytics_id}
              onChange={(e) => setForm(prev => ({ ...prev, google_analytics_id: e.target.value }))}
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X"
            />
            <p className="text-xs text-muted-foreground">
              Your Google Analytics 4 (GA4) or Universal Analytics tracking ID
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="google_search_console_verification">Google Search Console Verification</Label>
            <Input
              id="google_search_console_verification"
              value={form.google_search_console_verification}
              onChange={(e) => setForm(prev => ({ ...prev, google_search_console_verification: e.target.value }))}
              placeholder="HTML tag content value"
            />
            <p className="text-xs text-muted-foreground">
              The content value from Google Search Console HTML tag verification
            </p>
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
