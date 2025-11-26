import { drizzle } from "drizzle-orm/mysql2";
import { eq, desc, asc } from "drizzle-orm";
import { InsertUser, users, fiverrGigs, fiverrReviews, mediaLibrary } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ============================================================================
// CMS QUERIES - PROJECTS
// ============================================================================

import {
  projects,
  experiences,
  skills,
  certifications,
  education,
  blogs,
  companies,
  channels,
  referrals,
  socialLinks,
  hireOptions,
  siteSettings,
  heroSection,
  aboutSection,
  activityLogs,
  InsertProject,
  InsertExperience,
  InsertSkill,
  InsertCertification,
  InsertEducation,
  InsertBlog,
  InsertCompany,
  InsertChannel,
  InsertReferral,
  InsertSocialLink,
  InsertHireOption,
  InsertSiteSettings,
  InsertHeroSection,
  InsertAboutSection,
  InsertActivityLog,
} from "../drizzle/schema";
import { desc, asc } from "drizzle-orm";

export async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(asc(projects.order));
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] || null;
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(data);
  return result;
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(projects).where(eq(projects.id, id));
}

// ============================================================================
// CMS QUERIES - EXPERIENCES
// ============================================================================

export async function getExperiences() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(experiences).orderBy(asc(experiences.order));
}

export async function getExperienceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(experiences).where(eq(experiences.id, id)).limit(1);
  return result[0] || null;
}

export async function createExperience(data: InsertExperience) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(experiences).values(data);
}

export async function updateExperience(id: number, data: Partial<InsertExperience>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(experiences).set(data).where(eq(experiences.id, id));
}

export async function deleteExperience(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(experiences).where(eq(experiences.id, id));
}

// ============================================================================
// CMS QUERIES - SKILLS
// ============================================================================

export async function getSkills() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(skills).orderBy(asc(skills.category), asc(skills.order));
}

export async function getSkillsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(skills).where(eq(skills.category, category)).orderBy(asc(skills.order));
}

export async function createSkill(data: InsertSkill) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(skills).values(data);
}

export async function updateSkill(id: number, data: Partial<InsertSkill>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(skills).set(data).where(eq(skills.id, id));
}

export async function deleteSkill(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(skills).where(eq(skills.id, id));
}

// ============================================================================
// CMS QUERIES - CERTIFICATIONS
// ============================================================================

export async function getCertifications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(certifications).orderBy(asc(certifications.order));
}

export async function createCertification(data: InsertCertification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(certifications).values(data);
}

export async function updateCertification(id: number, data: Partial<InsertCertification>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(certifications).set(data).where(eq(certifications.id, id));
}

export async function deleteCertification(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(certifications).where(eq(certifications.id, id));
}

// ============================================================================
// CMS QUERIES - EDUCATION
// ============================================================================

export async function getEducation() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(education).orderBy(asc(education.order));
}

export async function createEducation(data: InsertEducation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(education).values(data);
}

export async function updateEducation(id: number, data: Partial<InsertEducation>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(education).set(data).where(eq(education.id, id));
}

export async function deleteEducation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(education).where(eq(education.id, id));
}

// ============================================================================
// CMS QUERIES - BLOGS
// ============================================================================

export async function getBlogs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogs).orderBy(asc(blogs.order));
}

export async function createBlog(data: InsertBlog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(blogs).values(data);
}

export async function updateBlog(id: number, data: Partial<InsertBlog>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(blogs).set(data).where(eq(blogs.id, id));
}

export async function deleteBlog(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(blogs).where(eq(blogs.id, id));
}

// ============================================================================
// CMS QUERIES - COMPANIES
// ============================================================================

export async function getCompanies() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(companies).orderBy(asc(companies.order));
}

export async function createCompany(data: InsertCompany) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(companies).values(data);
}

export async function updateCompany(id: number, data: Partial<InsertCompany>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(companies).set(data).where(eq(companies.id, id));
}

export async function deleteCompany(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(companies).where(eq(companies.id, id));
}

// ============================================================================
// CMS QUERIES - CHANNELS (WhatsApp/Telegram)
// ============================================================================

export async function getChannels() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(channels).orderBy(asc(channels.category), asc(channels.order));
}

export async function getChannelsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(channels).where(eq(channels.category, category)).orderBy(asc(channels.order));
}

export async function createChannel(data: InsertChannel) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(channels).values(data);
}

export async function updateChannel(id: number, data: Partial<InsertChannel>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(channels).set(data).where(eq(channels.id, id));
}

export async function deleteChannel(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(channels).where(eq(channels.id, id));
}

// ============================================================================
// CMS QUERIES - REFERRALS
// ============================================================================

export async function getReferrals() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(referrals).where(eq(referrals.isActive, true)).orderBy(asc(referrals.order));
}

export async function createReferral(data: InsertReferral) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(referrals).values(data);
}

export async function updateReferral(id: number, data: Partial<InsertReferral>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(referrals).set(data).where(eq(referrals.id, id));
}

export async function deleteReferral(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(referrals).where(eq(referrals.id, id));
}

// ============================================================================
// CMS QUERIES - SOCIAL LINKS
// ============================================================================

export async function getSocialLinks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(socialLinks).where(eq(socialLinks.isVisible, true)).orderBy(asc(socialLinks.order));
}

export async function createSocialLink(data: InsertSocialLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(socialLinks).values(data);
}

export async function updateSocialLink(id: number, data: Partial<InsertSocialLink>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
}

export async function deleteSocialLink(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(socialLinks).where(eq(socialLinks.id, id));
}

// ============================================================================
// CMS QUERIES - HIRE OPTIONS
// ============================================================================

export async function getHireOptions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(hireOptions).where(eq(hireOptions.isActive, true)).orderBy(asc(hireOptions.order));
}

export async function createHireOption(data: InsertHireOption) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(hireOptions).values(data);
}

export async function updateHireOption(id: number, data: Partial<InsertHireOption>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(hireOptions).set(data).where(eq(hireOptions.id, id));
}

export async function deleteHireOption(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(hireOptions).where(eq(hireOptions.id, id));
}

// ============================================================================
// CMS QUERIES - SITE SETTINGS
// ============================================================================

export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteSettings).limit(1);
  return result[0] || null;
}

export async function updateSiteSettings(data: Partial<InsertSiteSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSiteSettings();
  if (existing) {
    return db.update(siteSettings).set(data).where(eq(siteSettings.id, existing.id));
  } else {
    return db.insert(siteSettings).values(data as InsertSiteSettings);
  }
}

// ============================================================================
// CMS QUERIES - HERO & ABOUT SECTIONS
// ============================================================================

export async function getHeroSection() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(heroSection).limit(1);
  return result[0] || null;
}

export async function updateHeroSection(data: Partial<InsertHeroSection>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getHeroSection();
  if (existing) {
    return db.update(heroSection).set(data).where(eq(heroSection.id, existing.id));
  } else {
    return db.insert(heroSection).values(data as InsertHeroSection);
  }
}

export async function getAboutSection() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(aboutSection).limit(1);
  return result[0] || null;
}

export async function updateAboutSection(data: Partial<InsertAboutSection>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getAboutSection();
  if (existing) {
    return db.update(aboutSection).set(data).where(eq(aboutSection.id, existing.id));
  } else {
    return db.insert(aboutSection).values(data as InsertAboutSection);
  }
}

// ============================================================================
// CMS QUERIES - ACTIVITY LOGS
// ============================================================================

export async function createActivityLog(data: InsertActivityLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(activityLogs).values(data);
}

export async function getActivityLogs(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(limit);
}

// ============================================================================
// CONTACT FORM HELPERS
// ============================================================================

import { contactSubmissions, analyticsEvents, mediaLibrary, InsertContactSubmission, InsertAnalyticsEvent, InsertMediaFile } from '../drizzle/schema';
import { eq, desc, gte } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.insert(contactSubmissions).values(data);
}

export async function getContactSubmissions(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.contactSubmissions.findMany({
    limit,
    offset,
    orderBy: (submissions, { desc }) => desc(submissions.createdAt),
  });
}

export async function getContactSubmissionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.contactSubmissions.findFirst({
    where: (submissions, { eq }) => eq(submissions.id, id),
  });
}

export async function markContactAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.update(contactSubmissions)
    .set({ isRead: true })
    .where(eq(contactSubmissions.id, id));
}

export async function replyToContact(id: number, replyMessage: string) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.update(contactSubmissions)
    .set({ isReplied: true, replyMessage })
    .where(eq(contactSubmissions.id, id));
}

export async function deleteContactSubmission(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.delete(contactSubmissions)
    .where(eq(contactSubmissions.id, id));
}

// ============================================================================
// ANALYTICS HELPERS
// ============================================================================

export async function trackAnalyticsEvent(data: InsertAnalyticsEvent) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(analyticsEvents).values(data);
}

export async function getAnalyticsStats(days = 30) {
  const db = await getDb();
  if (!db) return { totalEvents: 0, pageViews: 0, clicks: 0, formSubmissions: 0, uniqueSessions: 0 };
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const events = await db.query.analyticsEvents.findMany({
    where: (events, { gte }) => gte(events.createdAt, startDate),
  });

  return {
    totalEvents: events.length,
    pageViews: events.filter(e => e.eventType === 'page_view').length,
    clicks: events.filter(e => e.eventType === 'click').length,
    formSubmissions: events.filter(e => e.eventType === 'form_submit').length,
    uniqueSessions: new Set(events.map(e => e.sessionId)).size,
  };
}

export async function getAnalyticsEvents(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.analyticsEvents.findMany({
    limit,
    offset,
    orderBy: (events, { desc }) => desc(events.createdAt),
  });
}

// ============================================================================
// MEDIA LIBRARY HELPERS
// ============================================================================

export async function createMediaFile(data: InsertMediaFile) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.insert(mediaLibrary).values(data);
}

export async function getMediaFiles(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.mediaLibrary.findMany({
    limit,
    offset,
    orderBy: (media, { desc }) => desc(media.createdAt),
  });
}

export async function getMediaFileById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.mediaLibrary.findFirst({
    where: (media, { eq }) => eq(media.id, id),
  });
}

export async function deleteMediaFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.delete(mediaLibrary)
    .where(eq(mediaLibrary.id, id));
}


// ============================================================================
// FIVERR GIGS HELPERS
// ============================================================================
export async function createFiverrGig(data: any) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.insert(fiverrGigs).values(data);
}

export async function getFiverrGigs(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.fiverrGigs.findMany({
    limit,
    offset,
    orderBy: (gigs: any) => asc(gigs.order),
  });
}

export async function getFiverrGigById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.fiverrGigs.findFirst({
    where: (gigs: any) => eq(gigs.id, id),
  });
}

export async function updateFiverrGig(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.update(fiverrGigs)
    .set(data)
    .where(eq(fiverrGigs.id, id));
}

export async function deleteFiverrGig(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.delete(fiverrGigs)
    .where(eq(fiverrGigs.id, id));
}

// ============================================================================
// FIVERR REVIEWS HELPERS
// ============================================================================
export async function createFiverrReview(data: any) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.insert(fiverrReviews).values(data);
}

export async function getFiverrReviews(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.fiverrReviews.findMany({
    limit,
    offset,
    orderBy: (reviews: any) => asc(reviews.order),
  });
}

export async function getFiverrReviewById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.fiverrReviews.findFirst({
    where: (reviews: any) => eq(reviews.id, id),
  });
}

export async function updateFiverrReview(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.update(fiverrReviews)
    .set(data)
    .where(eq(fiverrReviews.id, id));
}

export async function deleteFiverrReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  return await db.delete(fiverrReviews)
    .where(eq(fiverrReviews.id, id));
}
