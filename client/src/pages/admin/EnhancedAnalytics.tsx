import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3, TrendingUp, Users, MousePointerClick, MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const COLORS = ['#FFD700', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function EnhancedAnalytics() {
  const [days, setDays] = useState(30);

  const { data: stats, isLoading } = trpc.analytics.getStats.useQuery({ days });
  const { data: events } = trpc.analytics.getEvents.useQuery({ limit: 1000, offset: 0 });

  if (isLoading) {
    return <div className="p-8 text-center">Loading analytics...</div>;
  }

  // Prepare data for charts
  const eventTypeData = events
    ? Object.entries(
        events.reduce((acc: any, event: any) => {
          acc[event.eventType] = (acc[event.eventType] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }))
    : [];

  const eventNameData = events
    ? Object.entries(
        events.reduce((acc: any, event: any) => {
          acc[event.eventName] = (acc[event.eventName] || 0) + 1;
          return acc;
        }, {})
      )
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }))
    : [];

  const pagePathData = events
    ? Object.entries(
        events.reduce((acc: any, event: any) => {
          acc[event.pagePath] = (acc[event.pagePath] || 0) + 1;
          return acc;
        }, {})
      )
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }))
    : [];

  const statCards = [
    {
      label: 'Total Events',
      value: stats?.totalEvents || 0,
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      label: 'Page Views',
      value: stats?.pageViews || 0,
      icon: BarChart3,
      color: 'text-green-500',
    },
    {
      label: 'Clicks',
      value: stats?.clicks || 0,
      icon: MousePointerClick,
      color: 'text-yellow-500',
    },
    {
      label: 'Form Submissions',
      value: stats?.formSubmissions || 0,
      icon: MessageSquare,
      color: 'text-purple-500',
    },
    {
      label: 'Unique Sessions',
      value: stats?.uniqueSessions || 0,
      icon: Users,
      color: 'text-pink-500',
    },
  ];

  const handleExportData = () => {
    if (!events || events.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Event Type', 'Event Name', 'Page Path', 'Session ID', 'Timestamp'];
    const rows = events.map((event: any) => [
      event.eventType,
      event.eventName,
      event.pagePath,
      event.sessionId || 'N/A',
      new Date(event.createdAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Analytics data exported');
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={32} className="text-accent" />
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* Date Range Selector */}
      <div className="mb-8 flex gap-2">
        {[7, 30, 90, 365].map((d) => (
          <Button
            key={d}
            variant={days === d ? 'default' : 'outline'}
            onClick={() => setDays(d)}
            className={days === d ? 'bg-accent text-black' : ''}
          >
            Last {d} days
          </Button>
        ))}
        <Button
          onClick={handleExportData}
          variant="outline"
          className="ml-auto"
        >
          <Download size={16} className="mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{card.label}</p>
                  <p className="text-3xl font-bold">{card.value.toLocaleString()}</p>
                </div>
                <Icon size={24} className={card.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Event Type Distribution */}
        {eventTypeData.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Event Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventTypeData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Events */}
        {eventNameData.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Top Events</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventNameData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top Pages */}
        {pagePathData.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Top Pages</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pagePathData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Average Events per Day</p>
            <p className="text-2xl font-bold">
              {Math.round((stats?.totalEvents || 0) / days)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Click-through Rate</p>
            <p className="text-2xl font-bold">
              {stats?.pageViews ? Math.round(((stats?.clicks || 0) / stats.pageViews) * 100) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Form Conversion Rate</p>
            <p className="text-2xl font-bold">
              {stats?.pageViews
                ? Math.round(((stats?.formSubmissions || 0) / stats.pageViews) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
