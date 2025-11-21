import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Image as ImageIcon, Trash2, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MediaUpload from '@/components/MediaUpload';

export function MediaLibrary() {
  const [showUpload, setShowUpload] = useState(false);
  
  const { data: mediaFiles, isLoading, refetch } = trpc.media.list.useQuery({
    limit: 50,
    offset: 0,
  });
  
  const deleteMediaMutation = trpc.media.delete.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await deleteMediaMutation.mutateAsync(id);
      toast.success('File deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading media library...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <ImageIcon size={32} className="text-accent" />
        <h1 className="text-3xl font-bold">Media Library</h1>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upload New Media</h2>
            <Button
              variant="ghost"
              onClick={() => setShowUpload(false)}
            >
              ✕
            </Button>
          </div>
          <MediaUpload
            onUploadSuccess={() => {
              setShowUpload(false);
              refetch();
            }}
          />
        </div>
      )}

      {!showUpload && (
        <Button
          onClick={() => setShowUpload(true)}
          className="mb-8 bg-accent hover:bg-accent/90 text-black"
        >
          + Upload Media
        </Button>
      )}

      {/* Media Grid */}
      {mediaFiles && mediaFiles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaFiles.map((file: any) => (
            <div
              key={file.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-background flex items-center justify-center overflow-hidden">
                {file.s3Url?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <img
                    src={file.s3Url}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={48} className="text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-sm truncate">{file.filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyUrl(file.s3Url)}
                    className="flex-1"
                  >
                    <Copy size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <a href={file.s3Url} download target="_blank" rel="noopener noreferrer">
                      <Download size={14} />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(file.id)}
                    className="flex-1"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No media files yet</p>
          <Button
            onClick={() => setShowUpload(true)}
            className="mt-4 bg-accent hover:bg-accent/90 text-black"
          >
            Upload Your First File
          </Button>
        </div>
      )}
    </div>
  );
}
