-- Block anonymous/public access to seo_settings table
CREATE POLICY "Block anonymous access to seo settings" 
ON public.seo_settings 
FOR SELECT 
TO anon
USING (false);