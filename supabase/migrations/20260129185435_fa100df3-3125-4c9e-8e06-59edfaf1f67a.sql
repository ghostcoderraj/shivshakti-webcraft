-- Create role enum for user management
CREATE TYPE public.app_role AS ENUM ('super_admin', 'content_manager', 'seo_manager');

-- Create enquiry status enum
CREATE TYPE public.enquiry_status AS ENUM ('new', 'contacted', 'closed');

-- Create enquiry source enum
CREATE TYPE public.enquiry_source AS ENUM ('form', 'whatsapp', 'call');

-- Create quote status enum
CREATE TYPE public.quote_status AS ENUM ('pending', 'sent', 'closed');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Profiles table for user details
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product categories table
CREATE TABLE public.product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    image_alt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    product_code TEXT,
    short_description TEXT,
    long_description TEXT,
    specifications JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    key_benefits JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    meta_title TEXT,
    meta_description TEXT,
    seo_keywords TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enquiries table
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    company_name TEXT,
    city TEXT,
    state TEXT,
    product_interested TEXT,
    message TEXT,
    source enquiry_source DEFAULT 'form',
    status enquiry_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quote requests table
CREATE TABLE public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    customer_company TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER,
    special_requirements TEXT,
    admin_notes TEXT,
    status quote_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Global SEO settings table
CREATE TABLE public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    default_meta_title TEXT,
    default_meta_description TEXT,
    default_keywords TEXT,
    google_analytics_id TEXT,
    google_search_console_verification TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Page SEO settings table
CREATE TABLE public.page_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL UNIQUE,
    page_name TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    focus_keywords TEXT,
    canonical_url TEXT,
    is_indexed BOOLEAN DEFAULT true,
    og_title TEXT,
    og_image TEXT,
    enable_schema BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- FAQs table
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    page_slug TEXT,
    enable_schema BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Media library table
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    original_name TEXT,
    file_url TEXT NOT NULL,
    alt_text TEXT,
    file_size INTEGER,
    mime_type TEXT,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Local SEO settings table
CREATE TABLE public.local_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_locations JSONB DEFAULT '[]'::jsonb,
    local_keywords TEXT,
    google_business_profile_url TEXT,
    nap_name TEXT,
    nap_address TEXT,
    nap_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
  )
$$;

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON public.product_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_seo_updated_at BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_local_seo_updated_at BEFORE UPDATE ON public.local_seo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_seo ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles (only super_admin can manage)
CREATE POLICY "Super admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Super admins can update any profile" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for product_categories (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON public.product_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all categories" ON public.product_categories FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert categories" ON public.product_categories FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update categories" ON public.product_categories FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete categories" ON public.product_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all products" ON public.products FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for enquiries (public insert, admin read/update)
CREATE POLICY "Anyone can create enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for quote_requests (public insert, admin read/update)
CREATE POLICY "Anyone can create quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view quote requests" ON public.quote_requests FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update quote requests" ON public.quote_requests FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete quote requests" ON public.quote_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for seo_settings (admin only)
CREATE POLICY "Admins can view seo settings" ON public.seo_settings FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "SEO managers and super admins can insert seo settings" ON public.seo_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'seo_manager'));
CREATE POLICY "SEO managers and super admins can update seo settings" ON public.seo_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'seo_manager'));

-- RLS Policies for page_seo (admin only)
CREATE POLICY "Admins can view page seo" ON public.page_seo FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "SEO managers and super admins can manage page seo" ON public.page_seo FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'seo_manager'));

-- RLS Policies for faqs (public read, SEO manager write)
CREATE POLICY "Anyone can view active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all faqs" ON public.faqs FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "SEO managers and super admins can manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'seo_manager'));

-- RLS Policies for media (admin only)
CREATE POLICY "Admins can view media" ON public.media FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert media" ON public.media FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update media" ON public.media FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete media" ON public.media FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for local_seo (SEO manager)
CREATE POLICY "Admins can view local seo" ON public.local_seo FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "SEO managers and super admins can manage local seo" ON public.local_seo FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'seo_manager'));

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for media bucket
CREATE POLICY "Anyone can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update media files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin(auth.uid()));
CREATE POLICY "Super admins can delete media files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'super_admin'));

-- Insert default SEO settings
INSERT INTO public.seo_settings (default_meta_title, default_meta_description, default_keywords)
VALUES (
    'Shiv Shakti Enterprise - Premium Plywood & Wood Working Machinery Manufacturer',
    'Leading manufacturer of plywood machinery, finger jointing machines, band saw grinders, and wood working equipment in Ahmedabad, India. 23+ years of excellence.',
    'plywood machinery, wood working machinery, finger jointing machine, band saw grinder, sanding machine, Ahmedabad'
);

-- Insert default local SEO settings
INSERT INTO public.local_seo (nap_name, nap_address, nap_phone, google_business_profile_url, service_locations, local_keywords)
VALUES (
    'Shiv Shakti Enterprise',
    'Ahmedabad, Gujarat, India',
    '+91-XXXXXXXXXX',
    '',
    '["Ahmedabad", "Gujarat", "India"]'::jsonb,
    'plywood machinery Ahmedabad, wood working machine Gujarat, finger jointing machine India'
);

-- Insert default page SEO entries
INSERT INTO public.page_seo (page_slug, page_name, meta_title, meta_description, is_indexed, enable_schema) VALUES
('/', 'Home', 'Shiv Shakti Enterprise - Premium Plywood & Wood Working Machinery', 'Leading manufacturer of industrial plywood and wood working machinery. 23+ years of excellence in Ahmedabad, India.', true, true),
('/about', 'About Us', 'About Shiv Shakti Enterprise - 23+ Years of Manufacturing Excellence', 'Learn about Shiv Shakti Enterprise, a trusted manufacturer of plywood and wood working machinery since 2001.', true, true),
('/products', 'Products', 'Industrial Plywood & Wood Working Machinery Products', 'Browse our complete range of plywood machinery, finger jointing machines, sanding equipment, and more.', true, true),
('/contact', 'Contact', 'Contact Shiv Shakti Enterprise - Get a Quote', 'Contact us for inquiries about plywood machinery and wood working equipment. Located in Ahmedabad, Gujarat.', true, true),
('/why-choose-us', 'Why Choose Us', 'Why Choose Shiv Shakti Enterprise for Wood Working Machinery', 'Discover why leading manufacturers trust Shiv Shakti Enterprise for quality plywood and wood working machinery.', true, true);