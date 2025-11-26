import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { noCodeRouter } from "./routers/no-code";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getSkills,
  getSkillsByCategory,
  createSkill,
  updateSkill,
  deleteSkill,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getChannels,
  getChannelsByCategory,
  createChannel,
  updateChannel,
  deleteChannel,
  getReferrals,
  createReferral,
  updateReferral,
  deleteReferral,
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  createContactSubmission,
  getContactSubmissions,
  getContactSubmissionById,
  markContactAsRead,
  replyToContact,
  deleteContactSubmission,
  trackAnalyticsEvent,
  getAnalyticsStats,
  getAnalyticsEvents,
  getHireOptions,
  createHireOption,
  updateHireOption,
  deleteHireOption,
  getSiteSettings,
  updateSiteSettings,
  getHeroSection,
  updateHeroSection,
  getAboutSection,
  updateAboutSection,
  getActivityLogs,
  createActivityLog,
  getFiverrGigs,
  getFiverrGigById,
  createFiverrGig,
  updateFiverrGig,
  deleteFiverrGig,
  getFiverrReviews,
  getFiverrReviewById,
  createFiverrReview,
  updateFiverrReview,
  deleteFiverrReview,
} from "./db";

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const ProjectSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  category: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  isFeatured: z.boolean().optional(),
});

const ExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  periodStart: z.date().optional(),
  periodEnd: z.date().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  companyLogoUrl: z.string().optional(),
  order: z.number().optional(),
});

const SkillSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().optional(),
  proficiencyLevel: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  order: z.number().optional(),
});

const CertificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.date().optional(),
  expiryDate: z.date().optional(),
  credentialUrl: z.string().optional(),
  credentialId: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
});

const EducationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  fieldOfStudy: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  gpa: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

const BlogSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
});

const CompanySchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  role: z.string().optional(),
  order: z.number().optional(),
});

const ChannelSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  category: z.string().min(1),
  flagEmoji: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
});

const ReferralSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  benefit: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

const SocialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url(),
  iconType: z.string().optional(),
  order: z.number().optional(),
  isVisible: z.boolean().optional(),
});

const HireOptionSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  iconType: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

const HeroSectionSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  ctaButton1Text: z.string().optional(),
  ctaButton1Link: z.string().optional(),
  ctaButton2Text: z.string().optional(),
  ctaButton2Link: z.string().optional(),
});

const AboutSectionSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

const SiteSettingsSchema = z.object({
  siteTitle: z.string().optional(),
  siteDescription: z.string().optional(),
  siteKeywords: z.array(z.string()).optional(),
  faviconUrl: z.string().optional(),
  ogImageUrl: z.string().optional(),
  themeMode: z.enum(["dark", "light", "auto"]).optional(),
  accentColor: z.string().optional(),
  showAnalytics: z.boolean().optional(),
  googleAnalyticsId: z.string().optional(),
});

// ============================================================================
// ADMIN PROCEDURE - Requires admin role
// ============================================================================

const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return next({ ctx });
});

// ============================================================================
// ROUTERS
// ============================================================================


// ============================================================================
// CONTACT FORM ROUTER
// ============================================================================

const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      subject: z.string().min(5),
      message: z.string().min(10),
      phone: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const { sendContactConfirmationEmail, sendAdminNotificationEmail } = await import('./email');
        const result = await createContactSubmission(input);
        await sendContactConfirmationEmail({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        }).catch(err => console.error('Failed to send confirmation email:', err));
        await sendAdminNotificationEmail({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        }).catch(err => console.error('Failed to send admin notification:', err));
        await trackAnalyticsEvent({
          eventType: 'form_submit',
          eventName: 'contact_form_submitted',
          pagePath: '/contact',
          metadata: { name: input.name },
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to submit contact form',
        });
      }
    }),

  list: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await getContactSubmissions(input.limit, input.offset);
    }),

  getById: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await getContactSubmissionById(input);
    }),

  markAsRead: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await markContactAsRead(input);
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await deleteContactSubmission(input);
    }),

  reply: protectedProcedure
    .input(z.object({
      id: z.number(),
      replyMessage: z.string().min(5),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      try {
        const submission = await getContactSubmissionById(input.id);
        if (!submission) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Submission not found' });
        }
        return await replyToContact(input.id, input.replyMessage);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send reply',
        });
      }
    }),
});

// ============================================================================
// ANALYTICS ROUTER
// ============================================================================

const analyticsRouter = router({
  trackEvent: publicProcedure
    .input(z.object({
      eventType: z.string(),
      eventName: z.string().optional(),
      pagePath: z.string().optional(),
      sessionId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        await trackAnalyticsEvent(input);
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    }),

  getStats: protectedProcedure
    .input(z.object({ days: z.number().default(30) }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await getAnalyticsStats(input.days);
    }),

  getEvents: protectedProcedure
    .input(z.object({
      limit: z.number().default(100),
      offset: z.number().default(0),
    }))
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await getAnalyticsEvents(input.limit, input.offset);
    }),
});



export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ========================================================================
  // PUBLIC CMS QUERIES - For frontend to fetch content
  // ========================================================================

  cms: router({
    // Hero Section
    getHero: publicProcedure.query(() => getHeroSection()),
    
    // About Section
    getAbout: publicProcedure.query(() => getAboutSection()),
    
    // Projects
    getProjects: publicProcedure.query(() => getProjects()),
    
    // Experiences
    getExperiences: publicProcedure.query(() => getExperiences()),
    
    // Skills
    getSkills: publicProcedure.query(() => getSkills()),
    getSkillsByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => getSkillsByCategory(input.category)),
    
    // Certifications
    getCertifications: publicProcedure.query(() => getCertifications()),
    
    // Education
    getEducation: publicProcedure.query(() => getEducation()),
    
    // Blogs
    getBlogs: publicProcedure.query(() => getBlogs()),
    
    // Companies
    getCompanies: publicProcedure.query(() => getCompanies()),
    
    // Channels
    getChannels: publicProcedure.query(() => getChannels()),
    getChannelsByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => getChannelsByCategory(input.category)),
    
    // Referrals
    getReferrals: publicProcedure.query(() => getReferrals()),
    
    // Social Links
    getSocialLinks: publicProcedure.query(() => getSocialLinks()),
    
    // Hire Options
    getHireOptions: publicProcedure.query(() => getHireOptions()),
    
    // Fiverr Gigs
    getFiverrGigs: publicProcedure.query(() => getFiverrGigs()),
    
    // Fiverr Reviews
    getFiverrReviews: publicProcedure.query(() => getFiverrReviews()),
    
    // Site Settings
    getSiteSettings: publicProcedure.query(() => getSiteSettings()),
  }),

  // ========================================================================
  // ADMIN CMS MUTATIONS - For admin panel to manage content
  // ========================================================================

  admin: router({
    // HERO SECTION
    updateHero: adminProcedure
      .input(HeroSectionSchema)
      .mutation(({ input }) => updateHeroSection(input)),

    // ABOUT SECTION
    updateAbout: adminProcedure
      .input(AboutSectionSchema)
      .mutation(({ input }) => updateAboutSection(input)),

    // PROJECTS
    createProject: adminProcedure
      .input(ProjectSchema)
      .mutation(({ input }) => createProject(input)),
    
    updateProject: adminProcedure
      .input(z.object({ id: z.number(), data: ProjectSchema.partial() }))
      .mutation(({ input }) => updateProject(input.id, input.data)),
    
    deleteProject: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteProject(input.id)),

    // EXPERIENCES
    createExperience: adminProcedure
      .input(ExperienceSchema)
      .mutation(({ input }) => createExperience(input)),
    
    updateExperience: adminProcedure
      .input(z.object({ id: z.number(), data: ExperienceSchema.partial() }))
      .mutation(({ input }) => updateExperience(input.id, input.data)),
    
    deleteExperience: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteExperience(input.id)),

    // SKILLS
    createSkill: adminProcedure
      .input(SkillSchema)
      .mutation(({ input }) => createSkill(input)),
    
    updateSkill: adminProcedure
      .input(z.object({ id: z.number(), data: SkillSchema.partial() }))
      .mutation(({ input }) => updateSkill(input.id, input.data)),
    
    deleteSkill: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteSkill(input.id)),

    // CERTIFICATIONS
    createCertification: adminProcedure
      .input(CertificationSchema)
      .mutation(({ input }) => createCertification(input)),
    
    updateCertification: adminProcedure
      .input(z.object({ id: z.number(), data: CertificationSchema.partial() }))
      .mutation(({ input }) => updateCertification(input.id, input.data)),
    
    deleteCertification: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteCertification(input.id)),

    // EDUCATION
    createEducation: adminProcedure
      .input(EducationSchema)
      .mutation(({ input }) => createEducation(input)),
    
    updateEducation: adminProcedure
      .input(z.object({ id: z.number(), data: EducationSchema.partial() }))
      .mutation(({ input }) => updateEducation(input.id, input.data)),
    
    deleteEducation: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteEducation(input.id)),

    // BLOGS
    createBlog: adminProcedure
      .input(BlogSchema)
      .mutation(({ input }) => createBlog(input)),
    
    updateBlog: adminProcedure
      .input(z.object({ id: z.number(), data: BlogSchema.partial() }))
      .mutation(({ input }) => updateBlog(input.id, input.data)),
    
    deleteBlog: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteBlog(input.id)),

    // COMPANIES
    createCompany: adminProcedure
      .input(CompanySchema)
      .mutation(({ input }) => createCompany(input)),
    
    updateCompany: adminProcedure
      .input(z.object({ id: z.number(), data: CompanySchema.partial() }))
      .mutation(({ input }) => updateCompany(input.id, input.data)),
    
    deleteCompany: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteCompany(input.id)),

    // CHANNELS
    createChannel: adminProcedure
      .input(ChannelSchema)
      .mutation(({ input }) => createChannel(input)),
    
    updateChannel: adminProcedure
      .input(z.object({ id: z.number(), data: ChannelSchema.partial() }))
      .mutation(({ input }) => updateChannel(input.id, input.data)),
    
    deleteChannel: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteChannel(input.id)),

    // REFERRALS
    createReferral: adminProcedure
      .input(ReferralSchema)
      .mutation(({ input }) => createReferral(input)),
    
    updateReferral: adminProcedure
      .input(z.object({ id: z.number(), data: ReferralSchema.partial() }))
      .mutation(({ input }) => updateReferral(input.id, input.data)),
    
    deleteReferral: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteReferral(input.id)),

    // SOCIAL LINKS
    createSocialLink: adminProcedure
      .input(SocialLinkSchema)
      .mutation(({ input }) => createSocialLink(input)),
    
    updateSocialLink: adminProcedure
      .input(z.object({ id: z.number(), data: SocialLinkSchema.partial() }))
      .mutation(({ input }) => updateSocialLink(input.id, input.data)),
    
    deleteSocialLink: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteSocialLink(input.id)),

    // HIRE OPTIONS
    createHireOption: adminProcedure
      .input(HireOptionSchema)
      .mutation(({ input }) => createHireOption(input)),
    
    updateHireOption: adminProcedure
      .input(z.object({ id: z.number(), data: HireOptionSchema.partial() }))
      .mutation(({ input }) => updateHireOption(input.id, input.data)),
    
    deleteHireOption: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteHireOption(input.id)),

    // SITE SETTINGS
    updateSiteSettings: adminProcedure
      .input(SiteSettingsSchema)
      .mutation(({ input }) => updateSiteSettings(input)),

    // ACTIVITY LOGS
    getActivityLogs: adminProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => getActivityLogs(input.limit)),
    // FIVERR GIGS
    createFiverrGig: adminProcedure
      .input(z.object({ title: z.string(), description: z.string().optional(), imageUrl: z.string().optional(), priceFrom: z.string().optional(), priceTo: z.string().optional(), currency: z.string().optional(), rating: z.string().optional(), reviewCount: z.number().optional(), gigUrl: z.string().optional(), category: z.string().optional(), tags: z.array(z.string()).optional(), order: z.number().optional(), isActive: z.boolean().optional() }))
      .mutation(({ input }) => createFiverrGig(input)),
    
    updateFiverrGig: adminProcedure
      .input(z.object({ id: z.number(), data: z.object({ title: z.string().optional(), description: z.string().optional(), imageUrl: z.string().optional(), priceFrom: z.string().optional(), priceTo: z.string().optional(), currency: z.string().optional(), rating: z.string().optional(), reviewCount: z.number().optional(), gigUrl: z.string().optional(), category: z.string().optional(), tags: z.array(z.string()).optional(), order: z.number().optional(), isActive: z.boolean().optional() }) }))
      .mutation(({ input }) => updateFiverrGig(input.id, input.data)),
    
    deleteFiverrGig: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteFiverrGig(input.id)),
    
    // FIVERR REVIEWS
    createFiverrReview: adminProcedure
      .input(z.object({ reviewerName: z.string(), reviewerCountry: z.string().optional(), reviewerCountryCode: z.string().optional(), rating: z.string(), comment: z.string().optional(), gigTitle: z.string().optional(), priceRange: z.string().optional(), duration: z.string().optional(), reviewDate: z.date().optional(), order: z.number().optional(), isActive: z.boolean().optional() }))
      .mutation(({ input }) => createFiverrReview(input)),
    
    updateFiverrReview: adminProcedure
      .input(z.object({ id: z.number(), data: z.object({ reviewerName: z.string().optional(), reviewerCountry: z.string().optional(), reviewerCountryCode: z.string().optional(), rating: z.string().optional(), comment: z.string().optional(), gigTitle: z.string().optional(), priceRange: z.string().optional(), duration: z.string().optional(), reviewDate: z.date().optional(), order: z.number().optional(), isActive: z.boolean().optional() }) }))
      .mutation(({ input }) => updateFiverrReview(input.id, input.data)),
    
    deleteFiverrReview: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteFiverrReview(input.id)),

  }),

  // NO-CODE ADMIN SYSTEM
  noCode: noCodeRouter,
});

export type AppRouter = typeof appRouter;

// Temporary placeholder - will add Fiverr routers here
