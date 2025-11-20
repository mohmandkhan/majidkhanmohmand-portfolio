import AdminLayout from "@/components/admin/AdminLayout";
import { GenericContentManager } from "@/components/admin/GenericContentManager";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

// ============================================================================
// PROJECTS MANAGER
// ============================================================================

export function ProjectsManager() {
  const { data: projects, isLoading, refetch } = trpc.cms.getProjects.useQuery();
  const createMutation = trpc.admin.createProject.useMutation();
  const updateMutation = trpc.admin.updateProject.useMutation();
  const deleteMutation = trpc.admin.deleteProject.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Project"
        fields={[
          { name: "title", label: "Project Title", type: "text", required: true },
          { name: "url", label: "Project URL", type: "url", required: true },
          { name: "category", label: "Category", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "url" },
          { name: "order", label: "Display Order", type: "number" },
          { name: "isFeatured", label: "Featured", type: "checkbox" },
        ]}
        data={projects}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Project created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Project updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Project deleted successfully");
        }}
        displayColumns={["title", "category", "url"]}
        displayLabels={["Title", "Category", "URL"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// EXPERIENCES MANAGER
// ============================================================================

export function ExperiencesManager() {
  const { data: experiences, isLoading, refetch } = trpc.cms.getExperiences.useQuery();
  const createMutation = trpc.admin.createExperience.useMutation();
  const updateMutation = trpc.admin.updateExperience.useMutation();
  const deleteMutation = trpc.admin.deleteExperience.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Experience"
        fields={[
          { name: "title", label: "Job Title", type: "text", required: true },
          { name: "company", label: "Company Name", type: "text", required: true },
          { name: "location", label: "Location", type: "text" },
          { name: "periodStart", label: "Start Date", type: "date" },
          { name: "periodEnd", label: "End Date", type: "date" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "technologies", label: "Technologies (JSON array)", type: "json" },
          { name: "companyLogoUrl", label: "Company Logo URL", type: "url" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={experiences}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Experience created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Experience updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Experience deleted successfully");
        }}
        displayColumns={["title", "company", "periodStart"]}
        displayLabels={["Title", "Company", "Start Date"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// SKILLS MANAGER
// ============================================================================

export function SkillsManager() {
  const { data: skills, isLoading, refetch } = trpc.cms.getSkills.useQuery();
  const createMutation = trpc.admin.createSkill.useMutation();
  const updateMutation = trpc.admin.updateSkill.useMutation();
  const deleteMutation = trpc.admin.deleteSkill.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Skill"
        fields={[
          { name: "category", label: "Category", type: "text", required: true },
          { name: "name", label: "Skill Name", type: "text", required: true },
          { name: "icon", label: "Icon/Emoji", type: "text" },
          {
            name: "proficiencyLevel",
            label: "Proficiency Level",
            type: "select",
            options: [
              { value: "Beginner", label: "Beginner" },
              { value: "Intermediate", label: "Intermediate" },
              { value: "Advanced", label: "Advanced" },
              { value: "Expert", label: "Expert" },
            ],
          },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={skills}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Skill created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Skill updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Skill deleted successfully");
        }}
        displayColumns={["category", "name", "proficiencyLevel"]}
        displayLabels={["Category", "Skill", "Level"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// CERTIFICATIONS MANAGER
// ============================================================================

export function CertificationsManager() {
  const { data: certifications, isLoading, refetch } = trpc.cms.getCertifications.useQuery();
  const createMutation = trpc.admin.createCertification.useMutation();
  const updateMutation = trpc.admin.updateCertification.useMutation();
  const deleteMutation = trpc.admin.deleteCertification.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Certification"
        fields={[
          { name: "title", label: "Certification Title", type: "text", required: true },
          { name: "issuer", label: "Issuing Organization", type: "text", required: true },
          { name: "issueDate", label: "Issue Date", type: "date" },
          { name: "expiryDate", label: "Expiry Date", type: "date" },
          { name: "credentialUrl", label: "Credential URL", type: "url" },
          { name: "credentialId", label: "Credential ID", type: "text" },
          { name: "imageUrl", label: "Badge/Image URL", type: "url" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={certifications}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Certification created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Certification updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Certification deleted successfully");
        }}
        displayColumns={["title", "issuer", "issueDate"]}
        displayLabels={["Title", "Issuer", "Issue Date"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// EDUCATION MANAGER
// ============================================================================

export function EducationManager() {
  const { data: education, isLoading, refetch } = trpc.cms.getEducation.useQuery();
  const createMutation = trpc.admin.createEducation.useMutation();
  const updateMutation = trpc.admin.updateEducation.useMutation();
  const deleteMutation = trpc.admin.deleteEducation.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Education"
        fields={[
          { name: "degree", label: "Degree", type: "text", required: true },
          { name: "institution", label: "Institution", type: "text", required: true },
          { name: "fieldOfStudy", label: "Field of Study", type: "text" },
          { name: "startDate", label: "Start Date", type: "date" },
          { name: "endDate", label: "End Date", type: "date" },
          { name: "gpa", label: "GPA", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={education}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Education created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Education updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Education deleted successfully");
        }}
        displayColumns={["degree", "institution", "startDate"]}
        displayLabels={["Degree", "Institution", "Start Date"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// BLOGS MANAGER
// ============================================================================

export function BlogsManager() {
  const { data: blogs, isLoading, refetch } = trpc.cms.getBlogs.useQuery();
  const createMutation = trpc.admin.createBlog.useMutation();
  const updateMutation = trpc.admin.updateBlog.useMutation();
  const deleteMutation = trpc.admin.deleteBlog.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Blog"
        fields={[
          { name: "title", label: "Blog Title", type: "text", required: true },
          { name: "url", label: "Blog URL", type: "url", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Featured Image URL", type: "url" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={blogs}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Blog created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Blog updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Blog deleted successfully");
        }}
        displayColumns={["title", "url"]}
        displayLabels={["Title", "URL"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// COMPANIES MANAGER
// ============================================================================

export function CompaniesManager() {
  const { data: companies, isLoading, refetch } = trpc.cms.getCompanies.useQuery();
  const createMutation = trpc.admin.createCompany.useMutation();
  const updateMutation = trpc.admin.updateCompany.useMutation();
  const deleteMutation = trpc.admin.deleteCompany.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Company"
        fields={[
          { name: "name", label: "Company Name", type: "text", required: true },
          { name: "url", label: "Company Website", type: "url", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "logoUrl", label: "Logo URL", type: "url" },
          { name: "role", label: "Your Role", type: "text" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={companies}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Company created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Company updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Company deleted successfully");
        }}
        displayColumns={["name", "url", "role"]}
        displayLabels={["Name", "Website", "Role"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// CHANNELS MANAGER
// ============================================================================

export function ChannelsManager() {
  const { data: channels, isLoading, refetch } = trpc.cms.getChannels.useQuery();
  const createMutation = trpc.admin.createChannel.useMutation();
  const updateMutation = trpc.admin.updateChannel.useMutation();
  const deleteMutation = trpc.admin.deleteChannel.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Channel"
        fields={[
          { name: "title", label: "Channel Name", type: "text", required: true },
          { name: "url", label: "Channel URL", type: "url", required: true },
          { name: "category", label: "Category", type: "text", required: true },
          { name: "flagEmoji", label: "Flag Emoji", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
        data={channels}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Channel created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Channel updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Channel deleted successfully");
        }}
        displayColumns={["title", "category", "url"]}
        displayLabels={["Title", "Category", "URL"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// REFERRALS MANAGER
// ============================================================================

export function ReferralsManager() {
  const { data: referrals, isLoading, refetch } = trpc.cms.getReferrals.useQuery();
  const createMutation = trpc.admin.createReferral.useMutation();
  const updateMutation = trpc.admin.updateReferral.useMutation();
  const deleteMutation = trpc.admin.deleteReferral.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Referral"
        fields={[
          { name: "title", label: "Referral Title", type: "text", required: true },
          { name: "url", label: "Referral URL", type: "url", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "benefit", label: "Benefit/Offer", type: "text" },
          { name: "imageUrl", label: "Image URL", type: "url" },
          { name: "order", label: "Display Order", type: "number" },
          { name: "isActive", label: "Active", type: "checkbox" },
        ]}
        data={referrals}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Referral created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Referral updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Referral deleted successfully");
        }}
        displayColumns={["title", "benefit", "isActive"]}
        displayLabels={["Title", "Benefit", "Active"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// SOCIAL LINKS MANAGER
// ============================================================================

export function SocialLinksManager() {
  const { data: socialLinks, isLoading, refetch } = trpc.cms.getSocialLinks.useQuery();
  const createMutation = trpc.admin.createSocialLink.useMutation();
  const updateMutation = trpc.admin.updateSocialLink.useMutation();
  const deleteMutation = trpc.admin.deleteSocialLink.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Social Link"
        fields={[
          { name: "platform", label: "Platform Name", type: "text", required: true },
          { name: "url", label: "Profile URL", type: "url", required: true },
          { name: "iconType", label: "Icon Type", type: "text" },
          { name: "order", label: "Display Order", type: "number" },
          { name: "isVisible", label: "Visible", type: "checkbox" },
        ]}
        data={socialLinks}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Social link created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Social link updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Social link deleted successfully");
        }}
        displayColumns={["platform", "url", "isVisible"]}
        displayLabels={["Platform", "URL", "Visible"]}
      />
    </AdminLayout>
  );
}

// ============================================================================
// HIRE OPTIONS MANAGER
// ============================================================================

export function HireOptionsManager() {
  const { data: hireOptions, isLoading, refetch } = trpc.cms.getHireOptions.useQuery();
  const createMutation = trpc.admin.createHireOption.useMutation();
  const updateMutation = trpc.admin.updateHireOption.useMutation();
  const deleteMutation = trpc.admin.deleteHireOption.useMutation();

  return (
    <AdminLayout>
      <GenericContentManager
        title="Hire Option"
        fields={[
          { name: "title", label: "Option Title", type: "text", required: true },
          { name: "url", label: "Link URL", type: "url", required: true },
          { name: "iconType", label: "Icon Type", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "order", label: "Display Order", type: "number" },
          { name: "isActive", label: "Active", type: "checkbox" },
        ]}
        data={hireOptions}
        isLoading={isLoading}
        onAdd={async (data) => {
          await createMutation.mutateAsync(data);
          await refetch();
          toast.success("Hire option created successfully");
        }}
        onEdit={async (id, data) => {
          await updateMutation.mutateAsync({ id, data });
          await refetch();
          toast.success("Hire option updated successfully");
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync({ id });
          await refetch();
          toast.success("Hire option deleted successfully");
        }}
        displayColumns={["title", "url", "isActive"]}
        displayLabels={["Title", "URL", "Active"]}
      />
    </AdminLayout>
  );
}
