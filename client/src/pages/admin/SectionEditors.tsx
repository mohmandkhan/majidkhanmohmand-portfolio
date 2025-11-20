import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextInput, TextArea, FormActions } from "@/components/admin/FormComponents";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

// ============================================================================
// HERO SECTION EDITOR
// ============================================================================

export function HeroSectionEditor() {
  const { data: hero, isLoading, refetch } = trpc.cms.getHero.useQuery();
  const updateMutation = trpc.admin.updateHero.useMutation();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await updateMutation.mutateAsync(formData);
      await refetch();
      toast.success("Hero section updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hero Section Editor</h1>
          <p className="text-muted-foreground mt-2">Edit the main hero section of your website</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <TextInput
              label="Main Title"
              value={formData.title ?? hero?.title ?? ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Your name or main headline"
            />

            <TextInput
              label="Subtitle"
              value={formData.subtitle ?? hero?.subtitle ?? ""}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="Your professional tagline"
            />

            <TextArea
              label="Description"
              value={formData.description ?? hero?.description ?? ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief professional description"
            />

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Call-to-Action Button 1</h3>
              <TextInput
                label="Button Text"
                value={formData.ctaButton1Text ?? hero?.ctaButton1Text ?? ""}
                onChange={(e) => handleInputChange("ctaButton1Text", e.target.value)}
                placeholder="e.g., View My Work"
              />
              <TextInput
                label="Button Link"
                value={formData.ctaButton1Link ?? hero?.ctaButton1Link ?? ""}
                onChange={(e) => handleInputChange("ctaButton1Link", e.target.value)}
                placeholder="e.g., #projects"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Call-to-Action Button 2</h3>
              <TextInput
                label="Button Text"
                value={formData.ctaButton2Text ?? hero?.ctaButton2Text ?? ""}
                onChange={(e) => handleInputChange("ctaButton2Text", e.target.value)}
                placeholder="e.g., Hire Me"
              />
              <TextInput
                label="Button Link"
                value={formData.ctaButton2Link ?? hero?.ctaButton2Link ?? ""}
                onChange={(e) => handleInputChange("ctaButton2Link", e.target.value)}
                placeholder="e.g., #hire"
              />
            </div>

            <FormActions
              onSubmit={handleSubmit}
              onCancel={() => window.history.back()}
              isLoading={isSaving}
              submitLabel="Update Hero Section"
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

// ============================================================================
// ABOUT SECTION EDITOR
// ============================================================================

export function AboutSectionEditor() {
  const { data: about, isLoading, refetch } = trpc.cms.getAbout.useQuery();
  const updateMutation = trpc.admin.updateAbout.useMutation();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await updateMutation.mutateAsync(formData);
      await refetch();
      toast.success("About section updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">About Section Editor</h1>
          <p className="text-muted-foreground mt-2">Edit the about section of your website</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <TextInput
              label="Section Title"
              value={formData.title ?? about?.title ?? ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="About Me"
            />

            <TextArea
              label="About Content"
              value={formData.content ?? about?.content ?? ""}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Write your professional bio and background..."
            />

            <FormActions
              onSubmit={handleSubmit}
              onCancel={() => window.history.back()}
              isLoading={isSaving}
              submitLabel="Update About Section"
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

// ============================================================================
// SITE SETTINGS EDITOR
// ============================================================================

export function SiteSettingsEditor() {
  const { data: settings, isLoading, refetch } = trpc.cms.getSiteSettings.useQuery();
  const updateMutation = trpc.admin.updateSiteSettings.useMutation();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await updateMutation.mutateAsync(formData);
      await refetch();
      toast.success("Site settings updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground mt-2">Manage global site configuration</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <TextInput
              label="Site Title"
              value={formData.siteTitle ?? settings?.siteTitle ?? ""}
              onChange={(e) => handleInputChange("siteTitle", e.target.value)}
              placeholder="Your Site Title"
            />

            <TextArea
              label="Site Description"
              value={formData.siteDescription ?? settings?.siteDescription ?? ""}
              onChange={(e) => handleInputChange("siteDescription", e.target.value)}
              placeholder="Meta description for search engines"
            />

            <TextInput
              label="Site Keywords (comma-separated)"
              value={
                formData.siteKeywords
                  ? Array.isArray(formData.siteKeywords)
                    ? formData.siteKeywords.join(", ")
                    : formData.siteKeywords
                  : settings?.siteKeywords
                  ? Array.isArray(settings.siteKeywords)
                    ? settings.siteKeywords.join(", ")
                    : settings.siteKeywords
                  : ""
              }
              onChange={(e) =>
                handleInputChange("siteKeywords", e.target.value.split(",").map((k) => k.trim()))
              }
              placeholder="keyword1, keyword2, keyword3"
            />

            <TextInput
              label="Favicon URL"
              value={formData.faviconUrl ?? settings?.faviconUrl ?? ""}
              onChange={(e) => handleInputChange("faviconUrl", e.target.value)}
              placeholder="https://example.com/favicon.ico"
            />

            <TextInput
              label="OG Image URL"
              value={formData.ogImageUrl ?? settings?.ogImageUrl ?? ""}
              onChange={(e) => handleInputChange("ogImageUrl", e.target.value)}
              placeholder="https://example.com/og-image.jpg"
            />

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Theme & Appearance</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Default Theme Mode</label>
                <select
                  value={formData.themeMode ?? settings?.themeMode ?? "dark"}
                  onChange={(e) => handleInputChange("themeMode", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <TextInput
                label="Accent Color (Hex)"
                value={formData.accentColor ?? settings?.accentColor ?? "#FBBF24"}
                onChange={(e) => handleInputChange("accentColor", e.target.value)}
                placeholder="#FBBF24"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Analytics</h3>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showAnalytics ?? settings?.showAnalytics ?? false}
                    onChange={(e) => handleInputChange("showAnalytics", e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm font-medium">Enable Analytics</span>
                </label>
              </div>

              <TextInput
                label="Google Analytics ID"
                value={formData.googleAnalyticsId ?? settings?.googleAnalyticsId ?? ""}
                onChange={(e) => handleInputChange("googleAnalyticsId", e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <FormActions
              onSubmit={handleSubmit}
              onCancel={() => window.history.back()}
              isLoading={isSaving}
              submitLabel="Save Settings"
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
