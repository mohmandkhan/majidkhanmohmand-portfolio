import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { BarChart3, TrendingUp, Users, MousePointerClick, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AnalyticsDashboard() {
  const [days, setDays] = useState(30);
  
  const { data: stats, isLoading } = trpc.analytics.getStats.useQuery({ days });
  const { data: events } = trpc.analytics.getEvents.useQuery({ limit: 100, offset: 0 });

  if (isLoading) {
    return <div className="p-8 text-center">Loading analytics...</div>;
  }

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

      {/* Recent Events */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Event Type</th>
                <th className="text-left py-3 px-4">Event Name</th>
                <th className="text-left py-3 px-4">Page Path</th>
                <th className="text-left py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {events && events.length > 0 ? (
                events.map((event: any, idx: number) => (
                  <tr key={idx} className="border-b border-border hover:bg-background/50">
                    <td className="py-3 px-4">
                      <span className="inline-block bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-4">{event.eventName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{event.pagePath}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {event.createdAt
                        ? new Date(event.createdAt).toLocaleString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
                    No events recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
