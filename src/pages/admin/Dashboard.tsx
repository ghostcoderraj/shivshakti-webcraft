import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MessageSquare, Package, TrendingUp, Calendar, Clock } from 'lucide-react';
import { format, startOfDay, isToday } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardStats {
  totalEnquiries: number;
  todayEnquiries: number;
  totalQuotes: number;
  pendingQuotes: number;
  totalProducts: number;
  activeProducts: number;
  enquiriesByProduct: { name: string; count: number }[];
  enquiriesByStatus: { status: string; count: number }[];
  recentEnquiries: any[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    todayEnquiries: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    totalProducts: 0,
    activeProducts: 0,
    enquiriesByProduct: [],
    enquiriesByStatus: [],
    recentEnquiries: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch enquiries
      const { data: enquiries } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch quotes
      const { data: quotes } = await supabase
        .from('quote_requests')
        .select('*');

      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('*');

      const today = startOfDay(new Date());
      const todayEnquiries = (enquiries || []).filter(e => 
        new Date(e.created_at) >= today
      );

      // Group enquiries by product
      const productCounts: Record<string, number> = {};
      (enquiries || []).forEach(e => {
        if (e.product_interested) {
          productCounts[e.product_interested] = (productCounts[e.product_interested] || 0) + 1;
        }
      });
      const enquiriesByProduct = Object.entries(productCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Group enquiries by status
      const statusCounts: Record<string, number> = {};
      (enquiries || []).forEach(e => {
        statusCounts[e.status] = (statusCounts[e.status] || 0) + 1;
      });
      const enquiriesByStatus = Object.entries(statusCounts)
        .map(([status, count]) => ({ status, count }));

      setStats({
        totalEnquiries: enquiries?.length || 0,
        todayEnquiries: todayEnquiries.length,
        totalQuotes: quotes?.length || 0,
        pendingQuotes: (quotes || []).filter(q => q.status === 'pending').length,
        totalProducts: products?.length || 0,
        activeProducts: (products || []).filter(p => p.is_active).length,
        enquiriesByProduct,
        enquiriesByStatus,
        recentEnquiries: (enquiries || []).slice(0, 5),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnquiries}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">+{stats.todayEnquiries}</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Enquiries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayEnquiries}</div>
            <p className="text-xs text-muted-foreground">New leads today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalQuotes} total quotes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalProducts} total products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Enquiries by Product */}
        <Card>
          <CardHeader>
            <CardTitle>Product-wise Enquiries</CardTitle>
            <CardDescription>Top 5 products by enquiry count</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.enquiriesByProduct.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.enquiriesByProduct}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No enquiry data yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enquiries by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Enquiries by Status</CardTitle>
            <CardDescription>Distribution of enquiry statuses</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.enquiriesByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.enquiriesByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {stats.enquiriesByStatus.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No enquiry data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Enquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Enquiries</CardTitle>
          <CardDescription>Latest enquiries from potential customers</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentEnquiries.length > 0 ? (
            <div className="space-y-4">
              {stats.recentEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{enquiry.name}</p>
                      <Badge variant={
                        enquiry.status === 'new' ? 'default' : 
                        enquiry.status === 'contacted' ? 'secondary' : 
                        'outline'
                      }>
                        {enquiry.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {enquiry.product_interested || 'General Enquiry'}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{enquiry.email}</span>
                      <span>{enquiry.phone}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(enquiry.created_at), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs mt-1">
                      {format(new Date(enquiry.created_at), 'h:mm a')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No enquiries yet. They will appear here once submitted.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
