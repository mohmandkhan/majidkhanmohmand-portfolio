import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// CMS COLLECTIONS
// ============================================================================

/**
 * Hero Section - Main landing page hero content
 */
export const heroSection = mysqlTable("hero_section", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull().default("Majid Khan Mohmand"),
  subtitle: text("subtitle"),
  description: text("description"),
  ctaButton1Text: varchar("cta_button_1_text", { length: 100 }),
  ctaButton1Link: varchar("cta_button_1_link", { length: 500 }),
  ctaButton2Text: varchar("cta_button_2_text", { length: 100 }),
  ctaButton2Link: varchar("cta_button_2_link", { length: 500 }),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type HeroSection = typeof heroSection.$inferSelect;
export type InsertHeroSection = typeof heroSection.$inferInsert;

/**
 * About Section
 */
export const aboutSection = mysqlTable("about_section", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull().default("About Me"),
  content: text("content"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type AboutSection = typeof aboutSection.$inferSelect;
export type InsertAboutSection = typeof aboutSection.$inferInsert;

/**
 * Projects
 */
export const projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int("order").default(0),
  isFeatured: boolean("is_featured").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Professional Experience
 */
export const experiences = mysqlTable("experiences", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  periodStart: date("period_start"),
  periodEnd: date("period_end"),
  description: text("description"),
  technologies: json("technologies"), // JSON array of tech names
  companyLogoUrl: varchar("company_logo_url", { length: 500 }),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = typeof experiences.$inferInsert;

/**
 * Skills & Tools
 */
export const skills = mysqlTable("skills", {
  id: int("id").primaryKey().autoincrement(),
  category: varchar("category", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  proficiencyLevel: mysqlEnum("proficiency_level", ["Beginner", "Intermediate", "Advanced", "Expert"]).default("Intermediate"),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = typeof skills.$inferInsert;

/**
 * Certifications
 */
export const certifications = mysqlTable("certifications", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  issueDate: date("issue_date"),
  expiryDate: date("expiry_date"),
  credentialUrl: varchar("credential_url", { length: 500 }),
  credentialId: varchar("credential_id", { length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = typeof certifications.$inferInsert;

/**
 * Education
 */
export const education = mysqlTable("education", {
  id: int("id").primaryKey().autoincrement(),
  degree: varchar("degree", { length: 255 }).notNull(),
  institution: varchar("institution", { length: 255 }).notNull(),
  fieldOfStudy: varchar("field_of_study", { length: 255 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  gpa: varchar("gpa", { length: 50 }),
  description: text("description"),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Education = typeof education.$inferSelect;
export type InsertEducation = typeof education.$inferInsert;

/**
 * Blogs
 */
export const blogs = mysqlTable("blogs", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Blog = typeof blogs.$inferSelect;
export type InsertBlog = typeof blogs.$inferInsert;

/**
 * Companies & Ventures
 */
export const companies = mysqlTable("companies", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  description: text("description"),
  logoUrl: varchar("logo_url", { length: 500 }),
  role: varchar("role", { length: 255 }),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * WhatsApp & Telegram Channels
 */
export const channels = mysqlTable("channels", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  flagEmoji: varchar("flag_emoji", { length: 10 }),
  description: text("description"),
  order: int("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Channel = typeof channels.$inferSelect;
export type InsertChannel = typeof channels.$inferInsert;

/**
 * Referrals & Offers
 */
export const referrals = mysqlTable("referrals", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  description: text("description"),
  benefit: varchar("benefit", { length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

/**
 * Social Media Links
 */
export const socialLinks = mysqlTable("social_links", {
  id: int("id").primaryKey().autoincrement(),
  platform: varchar("platform", { length: 100 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  iconType: varchar("icon_type", { length: 100 }),
  order: int("order").default(0),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type SocialLink = typeof socialLinks.$inferSelect;
export type InsertSocialLink = typeof socialLinks.$inferInsert;

/**
 * Hire Me Options
 */
export const hireOptions = mysqlTable("hire_options", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  iconType: varchar("icon_type", { length: 100 }),
  description: text("description"),
  order: int("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type HireOption = typeof hireOptions.$inferSelect;
export type InsertHireOption = typeof hireOptions.$inferInsert;

/**
 * Site Settings & Metadata
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").primaryKey().autoincrement(),
  siteTitle: varchar("site_title", { length: 255 }).notNull().default("Majid Khan Mohmand"),
  siteDescription: text("site_description"),
  siteKeywords: json("site_keywords"), // JSON array of keywords
  faviconUrl: varchar("favicon_url", { length: 500 }),
  ogImageUrl: varchar("og_image_url", { length: 500 }),
  themeMode: mysqlEnum("theme_mode", ["dark", "light", "auto"]).default("dark"),
  accentColor: varchar("accent_color", { length: 50 }).default("#FBBF24"),
  showAnalytics: boolean("show_analytics").default(false),
  googleAnalyticsId: varchar("google_analytics_id", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = typeof siteSettings.$inferInsert;

/**
 * Activity Logs - Audit trail for all CMS changes
 */
export const activityLogs = mysqlTable("activity_logs", {
  id: int("id").primaryKey().autoincrement(),
  adminUserId: int("admin_user_id"),
  action: varchar("action", { length: 50 }).notNull(), // "created", "updated", "deleted"
  entityType: varchar("entity_type", { length: 100 }).notNull(), // "project", "experience", etc.
  entityId: int("entity_id"),
  changes: json("changes"), // JSON object of what changed
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = typeof activityLogs.$inferInsert;

// ============================================================================
// CONTACT FORM & ANALYTICS
// ============================================================================

/**
 * Contact Form Submissions
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  phone: varchar("phone", { length: 20 }),
  isRead: boolean("is_read").default(false),
  isReplied: boolean("is_replied").default(false),
  replyMessage: text("reply_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Analytics Events - Track visitor interactions
 */
export const analyticsEvents = mysqlTable("analytics_events", {
  id: int("id").primaryKey().autoincrement(),
  eventType: varchar("event_type", { length: 100 }).notNull(), // page_view, click, form_submit, etc.
  eventName: varchar("event_name", { length: 255 }),
  pagePath: varchar("page_path", { length: 500 }),
  referrer: varchar("referrer", { length: 500 }),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  sessionId: varchar("session_id", { length: 100 }),
  metadata: json("metadata"), // Additional event data
  createdAt: timestamp("created_at").defaultNow(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

/**
 * Media Library - Track uploaded images
 */
export const mediaLibrary = mysqlTable("media_library", {
  id: int("id").primaryKey().autoincrement(),
  filename: varchar("filename", { length: 255 }).notNull(),
  s3Key: varchar("s3_key", { length: 500 }).notNull().unique(),
  s3Url: varchar("s3_url", { length: 500 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  fileSize: int("file_size"),
  width: int("width"),
  height: int("height"),
  uploadedBy: int("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type MediaFile = typeof mediaLibrary.$inferSelect;
export type InsertMediaFile = typeof mediaLibrary.$inferInsert;


// ============================================================================
// NO-CODE ADMIN SYSTEM - THEMES, SECTIONS, NAVIGATION
// ============================================================================

/**
 * Themes - Pre-built and custom themes
 */
export const themes = mysqlTable("themes", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  isPrebuilt: boolean("is_prebuilt").default(true),
  colors: json("colors").notNull(), // { primary, accent, background, foreground, etc. }
  typography: json("typography"), // { fontFamily, headingSize, bodySize, etc. }
  layout: json("layout"), // { sectionLayout, cardStyle, etc. }
  thumbnail: varchar("thumbnail", { length: 500 }), // URL to theme preview image
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type Theme = typeof themes.$inferSelect;
export type InsertTheme = typeof themes.$inferInsert;

/**
 * Section Settings - Control visibility and order of sections
 */
export const sectionSettings = mysqlTable("section_settings", {
  id: int("id").primaryKey().autoincrement(),
  sectionName: varchar("section_name", { length: 100 }).notNull().unique(), // "hero", "about", "projects", etc.
  displayName: varchar("display_name", { length: 100 }).notNull(),
  isVisible: boolean("is_visible").default(true),
  displayOrder: int("display_order").default(0),
  layoutTemplate: varchar("layout_template", { length: 50 }).default("default"), // "grid", "list", "card", "minimal"
  customTitle: varchar("custom_title", { length: 255 }),
  customDescription: text("custom_description"),
  backgroundColor: varchar("background_color", { length: 50 }),
  textColor: varchar("text_color", { length: 50 }),
  metadata: json("metadata"), // Additional section-specific settings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type SectionSetting = typeof sectionSettings.$inferSelect;
export type InsertSectionSetting = typeof sectionSettings.$inferInsert;

/**
 * Navigation Items - Dynamic navigation menu
 */
export const navigationItems = mysqlTable("navigation_items", {
  id: int("id").primaryKey().autoincrement(),
  label: varchar("label", { length: 100 }).notNull(),
  href: varchar("href", { length: 500 }).notNull(),
  displayOrder: int("display_order").default(0),
  isVisible: boolean("is_visible").default(true),
  icon: varchar("icon", { length: 100 }), // Icon name or emoji
  target: varchar("target", { length: 20 }).default("_self"), // "_self" or "_blank"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type NavigationItem = typeof navigationItems.$inferSelect;
export type InsertNavigationItem = typeof navigationItems.$inferInsert;

/**
 * Typography Settings - Global font and text settings
 */
export const typographySettings = mysqlTable("typography_settings", {
  id: int("id").primaryKey().autoincrement(),
  headingFontFamily: varchar("heading_font_family", { length: 100 }).default("Sora"),
  bodyFontFamily: varchar("body_font_family", { length: 100 }).default("Sora"),
  headingFontSize: varchar("heading_font_size", { length: 50 }).default("3rem"),
  subheadingFontSize: varchar("subheading_font_size", { length: 50 }).default("1.875rem"),
  bodyFontSize: varchar("body_font_size", { length: 50 }).default("1rem"),
  smallFontSize: varchar("small_font_size", { length: 50 }).default("0.875rem"),
  headingFontWeight: varchar("heading_font_weight", { length: 50 }).default("700"),
  bodyFontWeight: varchar("body_font_weight", { length: 50 }).default("400"),
  lineHeight: varchar("line_height", { length: 50 }).default("1.6"),
  letterSpacing: varchar("letter_spacing", { length: 50 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type TypographySetting = typeof typographySettings.$inferSelect;
export type InsertTypographySetting = typeof typographySettings.$inferInsert;

/**
 * Color Palette - Custom color schemes
 */
export const colorPalettes = mysqlTable("color_palettes", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  primaryColor: varchar("primary_color", { length: 50 }).notNull(),
  accentColor: varchar("accent_color", { length: 50 }).notNull(),
  backgroundColor: varchar("background_color", { length: 50 }).notNull(),
  foregroundColor: varchar("foreground_color", { length: 50 }).notNull(),
  cardBackgroundColor: varchar("card_background_color", { length: 50 }).notNull(),
  borderColor: varchar("border_color", { length: 50 }).notNull(),
  successColor: varchar("success_color", { length: 50 }).default("#10B981"),
  warningColor: varchar("warning_color", { length: 50 }).default("#F59E0B"),
  errorColor: varchar("error_color", { length: 50 }).default("#EF4444"),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type ColorPalette = typeof colorPalettes.$inferSelect;
export type InsertColorPalette = typeof colorPalettes.$inferInsert;

/**
 * Layout Templates - Different layout options for sections
 */
export const layoutTemplates = mysqlTable("layout_templates", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  gridColumns: int("grid_columns").default(3),
  cardStyle: varchar("card_style", { length: 50 }).default("elevated"), // "elevated", "outlined", "filled"
  spacing: varchar("spacing", { length: 50 }).default("medium"), // "compact", "medium", "spacious"
  alignment: varchar("alignment", { length: 50 }).default("center"), // "left", "center", "right"
  metadata: json("metadata"), // Additional layout settings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
export type LayoutTemplate = typeof layoutTemplates.$inferSelect;
export type InsertLayoutTemplate = typeof layoutTemplates.$inferInsert;
