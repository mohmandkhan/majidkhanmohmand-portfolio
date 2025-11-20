import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";

import { trpc } from "@/lib/trpc";
import {
  FileText,
  Briefcase,
  Code2,
  Award,
  BookOpen,
  Building2,
  MessageCircle,
  Gift,
  Share2,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: projects } = trpc.cms.getProjects.useQuery();

  const { data: experiences } = trpc.cms.getExperiences.useQuery();

  const { data: skills } = trpc.cms.getSkills.useQuery();

  const { data: certifications } = trpc.cms.getCertifications.useQuery();

  const { data: education } = trpc.cms.getEducation.useQuery();

  const { data: blogs } = trpc.cms.getBlogs.useQuery();

  const { data: companies } = trpc.cms.getCompanies.useQuery();

  const { data: channels } = trpc.cms.getChannels.useQuery();

  const { data: referrals } = trpc.cms.getReferrals.useQuery();

  const { data: socialLinks } = trpc.cms.getSocialLinks.useQuery();

  const { data: activityLogs } = trpc.admin.getActivityLogs.useQuery({ limit: 10 });

  const stats = [
    { label: "Projects", count: projects?.length || 0, icon: Code2, color: "bg-blue-500" },
    { label: "Experiences", count: experiences?.length || 0, icon: Briefcase, color: "bg-green-500" },
    { label: "Skills", count: skills?.length || 0, icon: Code2, color: "bg-purple-500" },
    { label: "Certifications", count: certifications?.length || 0, icon: Award, color: "bg-yellow-500" },
    { label: "Education", count: education?.length || 0, icon: BookOpen, color: "bg-indigo-500" },
    { label: "Blogs", count: blogs?.length || 0, icon: FileText, color: "bg-pink-500" },
    { label: "Companies", count: companies?.length || 0, icon: Building2, color: "bg-orange-500" },
    { label: "Channels", count: channels?.length || 0, icon: MessageCircle, color: "bg-cyan-500" },
    { label: "Referrals", count: referrals?.length || 0, icon: Gift, color: "bg-red-500" },
    { label: "Social Links", count: socialLinks?.length || 0, icon: Share2, color: "bg-teal-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Content Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.count}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="p-6">
            {activityLogs && activityLogs.length > 0 ? (
              <div className="space-y-4">
                {activityLogs.map((log: any) => (
                  <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="font-medium capitalize">
                        {log.action} - {log.entityType}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent activity</p>
            )}
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <p className="text-muted-foreground text-sm">Total Content Items</p>
              <p className="text-3xl font-bold mt-2">
                {(projects?.length || 0) +
                  (experiences?.length || 0) +
                  (skills?.length || 0) +
                  (certifications?.length || 0) +
                  (education?.length || 0) +
                  (blogs?.length || 0) +
                  (companies?.length || 0) +
                  (channels?.length || 0) +
                  (referrals?.length || 0) +
                  (socialLinks?.length || 0)}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm">Last Updated</p>
              <p className="text-lg font-semibold mt-2">
                {activityLogs && activityLogs.length > 0 && activityLogs[0].createdAt
                  ? new Date(activityLogs[0].createdAt).toLocaleDateString()
                  : "Never"}
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm">Status</p>
              <p className="text-lg font-semibold mt-2 text-green-500">✓ All Systems Operational</p>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
