import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface MediaUploadProps {
  onUploadSuccess?: (url: string) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

export default function MediaUpload({
  onUploadSuccess,
  acceptedTypes = 'image/*',
  maxSize = 5,
}: MediaUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.media.upload.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    setIsUploading(true);
    try {
      // In a real implementation, you would upload to S3 first
      // For now, we'll create a placeholder URL
      const formData = new FormData();
      formData.append('file', selectedFile);

      // This would normally call your S3 upload endpoint
      // For now, we'll use a placeholder
      const fileUrl = URL.createObjectURL(selectedFile);

      await uploadMutation.mutateAsync({
        filename: selectedFile.name,
        s3Key: `media/${Date.now()}_${selectedFile.name}`,
        s3Url: fileUrl,
        mimeType: selectedFile.type,
        fileSize: selectedFile.size,
      });

      toast.success('File uploaded successfully!');
      onUploadSuccess?.(fileUrl);
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload file');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs max-h-64 rounded-lg"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setSelectedFile(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <ImageIcon size={48} className="mx-auto text-muted-foreground" />
            <div>
              <p className="font-semibold mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">
                {acceptedTypes === 'image/*' ? 'PNG, JPG, GIF' : 'Supported formats'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Max file size: {maxSize}MB
              </p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Select File
            </>
          )}
        </Button>
      </div>

      {selectedFile && (
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full mt-4 bg-accent hover:bg-accent/90 text-black"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>
      )}
    </div>
  );
}
