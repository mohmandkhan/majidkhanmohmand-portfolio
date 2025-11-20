import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, BarChart3, Image as ImageIcon, Trash2, Eye, Check } from 'lucide-react';

// ============================================================================
// CONTACT SUBMISSIONS MANAGER
// ============================================================================

export function ContactSubmissionsManager() {
  const { data: submissions, isLoading, refetch } = trpc.contact.list.useQuery({
    limit: 50,
    offset: 0,
  });
  const deleteContactMutation = trpc.contact.delete.useMutation();
  const markAsReadMutation = trpc.contact.markAsRead.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      await deleteContactMutation.mutateAsync(id);
      toast.success('Submission deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete submission');
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync(id);
      toast.success('Marked as read');
      refetch();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading submissions...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Mail size={28} className="text-yellow-500" />
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
      </div>

      {!submissions || submissions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No contact submissions yet
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission: any) => (
            <div
              key={submission.id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {submission.name}
                    {!submission.isRead && (
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{submission.email}</p>
                  {submission.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{submission.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {!submission.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(submission.id)}
                      className="flex items-center gap-1"
                    >
                      <Check size={16} />
                      Mark Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(submission.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
              <div className="mb-3">
                <p className="font-medium text-sm mb-1">Subject: {submission.subject}</p>
                <p className="text-gray-700 dark:text-gray-300">{submission.message}</p>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ANALYTICS DASHBOARD
// ============================================================================

export function AnalyticsDashboard() {
  const { data: stats, isLoading } = trpc.analytics.getStats.useQuery({ days: 30 });

  if (isLoading) return <div className="p-8 text-center">Loading analytics...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={28} className="text-yellow-500" />
        <h1 className="text-3xl font-bold">Analytics (Last 30 Days)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Events</p>
          <p className="text-4xl font-bold">{stats?.totalEvents || 0}</p>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Page Views</p>
          <p className="text-4xl font-bold">{stats?.pageViews || 0}</p>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Clicks</p>
          <p className="text-4xl font-bold">{stats?.clicks || 0}</p>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Form Submissions</p>
          <p className="text-4xl font-bold">{stats?.formSubmissions || 0}</p>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Unique Sessions</p>
          <p className="text-4xl font-bold">{stats?.uniqueSessions || 0}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MEDIA LIBRARY MANAGER
// ============================================================================

export function MediaLibraryManager() {
  const { data: mediaFiles, isLoading, refetch } = trpc.media.list.useQuery({
    limit: 50,
    offset: 0,
  });
  const deleteMediaMutation = trpc.media.delete.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    try {
      await deleteMediaMutation.mutateAsync(id);
      toast.success('Media file deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete media file');
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading media files...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <ImageIcon size={28} className="text-yellow-500" />
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      {!mediaFiles || mediaFiles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No media files uploaded yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaFiles.map((file: any) => (
            <div
              key={file.id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {file.s3Url && (
                <img
                  src={file.s3Url}
                  alt={file.filename}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold truncate mb-2">{file.filename}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {(file.fileSize / 1024).toFixed(2)} KB
                </p>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(file.id)}
                  className="w-full flex items-center justify-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
