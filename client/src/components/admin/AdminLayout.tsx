import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "wouter";
import { useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code2,
  Award,
  BookOpen,
  Building2,
  MessageCircle,
  Gift,
  Share2,
  Zap,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminMenuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero Section", href: "/admin/hero", icon: Zap },
  { label: "About Section", href: "/admin/about", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: Code2 },
  { label: "Experiences", href: "/admin/experiences", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Education", href: "/admin/education", icon: BookOpen },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Companies", href: "/admin/companies", icon: Building2 },
  { label: "Channels", href: "/admin/channels", icon: MessageCircle },
  { label: "Referrals", href: "/admin/referrals", icon: Gift },
  { label: "Social Links", href: "/admin/social-links", icon: Share2 },
  { label: "Hire Options", href: "/admin/hire-options", icon: Briefcase },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You don't have permission to access the admin panel.</p>
          <Button onClick={() => navigate("/")} variant="default">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && <h1 className="font-bold text-lg">Admin Panel</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
                title={item.label}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span className="ml-2 text-sm">Toggle Theme</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="w-full justify-start text-red-500 hover:text-red-600"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-2 text-sm">Exit Admin</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  );
}
