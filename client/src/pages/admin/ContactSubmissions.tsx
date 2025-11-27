import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Mail,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

export function ContactSubmissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "replied">(
    "all"
  );
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const {
    data: submissions,
    isLoading,
    refetch,
  } = trpc.contact.list.useQuery({
    limit: 100,
    offset: 0,
  });

  const markAsReadMutation = trpc.contact.markAsRead.useMutation();
  const replyMutation = trpc.contact.reply.useMutation();
  const deleteMutation = trpc.contact.delete.useMutation();

  const filteredSubmissions = submissions?.filter((sub: any) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "unread") return matchesSearch && !sub.isRead;
    if (filterType === "replied") return matchesSearch && sub.isReplied;
    return matchesSearch;
  });

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    try {
      await markAsReadMutation.mutateAsync(id);
      refetch();
      toast.success(isRead ? "Marked as unread" : "Marked as read");
    } catch (error) {
      toast.error("Failed to update submission");
    }
  };

  const handleReply = async (id: number) => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsReplying(true);
    try {
      await replyMutation.mutateAsync({
        id,
        replyMessage,
      });
      setReplyMessage("");
      setSelectedSubmission(null);
      refetch();
      toast.success("Reply sent successfully");
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setIsReplying(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      refetch();
      toast.success("Submission deleted");
    } catch (error) {
      toast.error("Failed to delete submission");
    }
  };

  const handleExportCSV = () => {
    if (!filteredSubmissions || filteredSubmissions.length === 0) {
      toast.error("No submissions to export");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Subject",
      "Message",
      "Phone",
      "Status",
      "Date",
    ];
    const rows = filteredSubmissions.map((sub: any) => [
      sub.name,
      sub.email,
      sub.subject,
      sub.message,
      sub.phone || "N/A",
      sub.isRead ? "Read" : "Unread",
      new Date(sub.createdAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row: any[]) => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Submissions exported");
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">Loading submissions...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 mb-8">
        <Mail size={32} className="text-accent" />
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <Input
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
            className={filterType === "all" ? "bg-accent text-black" : ""}
          >
            All ({submissions?.length || 0})
          </Button>
          <Button
            variant={filterType === "unread" ? "default" : "outline"}
            onClick={() => setFilterType("unread")}
            className={filterType === "unread" ? "bg-accent text-black" : ""}
          >
            Unread ({submissions?.filter((s: any) => !s.isRead).length || 0})
          </Button>
          <Button
            variant={filterType === "replied" ? "default" : "outline"}
            onClick={() => setFilterType("replied")}
            className={filterType === "replied" ? "bg-accent text-black" : ""}
          >
            Replied ({submissions?.filter((s: any) => s.isReplied).length || 0})
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="ml-auto"
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Submissions Table */}
      {filteredSubmissions && filteredSubmissions.length > 0 ? (
        <div className="space-y-4">
          {filteredSubmissions.map((submission: any) => (
            <div
              key={submission.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{submission.name}</h3>
                    <div className="flex gap-2">
                      {!submission.isRead && (
                        <span className="inline-block bg-blue-500/20 text-blue-500 px-2 py-1 rounded text-xs font-medium">
                          Unread
                        </span>
                      )}
                      {submission.isReplied && (
                        <span className="inline-block bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-medium">
                          Replied
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {submission.email}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {submission.phone && `Phone: ${submission.phone}`}
                  </p>
                  <p className="font-semibold text-accent mb-2">
                    {submission.subject}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleMarkAsRead(submission.id, submission.isRead)
                    }
                  >
                    {submission.isRead ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <MessageSquare size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(submission.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                {new Date(submission.createdAt).toLocaleString()}
              </p>

              {submission.isReplied && submission.replyMessage && (
                <div className="mt-4 p-4 bg-background rounded border border-border">
                  <p className="text-xs font-semibold text-accent mb-2">
                    Your Reply:
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {submission.replyMessage}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No submissions found</p>
        </div>
      )}

      {/* Reply Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">
              Reply to {selectedSubmission.name}
            </h2>

            <div className="mb-6 p-4 bg-background rounded border border-border">
              <p className="text-sm text-muted-foreground mb-2">
                Original Message:
              </p>
              <p className="text-sm whitespace-pre-wrap">
                {selectedSubmission.message}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={6}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubmission(null);
                    setReplyMessage("");
                  }}
                  disabled={isReplying}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReply(selectedSubmission.id)}
                  disabled={isReplying}
                  className="bg-accent hover:bg-accent/90 text-black"
                >
                  {isReplying ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
