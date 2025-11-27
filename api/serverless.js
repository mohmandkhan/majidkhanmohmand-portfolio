var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
      resendApiKey: process.env.RESEND_API_KEY ?? "re_test_placeholder_key"
    };
  }
});

// server/email.ts
var email_exports = {};
__export(email_exports, {
  sendAdminNotificationEmail: () => sendAdminNotificationEmail,
  sendContactConfirmationEmail: () => sendContactConfirmationEmail,
  sendReplyEmail: () => sendReplyEmail
});
import { Resend } from "resend";
async function sendContactConfirmationEmail(data) {
  try {
    const result = await resend.emails.send({
      from: "noreply@majidkhanmohmand.com",
      to: data.email,
      subject: `We received your message: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${data.name},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message Details:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p>Best regards,<br>Majid Khan Mohmand</p>
        </div>
      `
    });
    return result;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    throw error;
  }
}
async function sendAdminNotificationEmail(data) {
  try {
    const result = await resend.emails.send({
      from: "noreply@majidkhanmohmand.com",
      to: "admin@majidkhanmohmand.com",
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p>
            <a href="https://majidkhanmohmand.com/admin" style="background-color: #FFD700; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
              View in Admin Panel
            </a>
          </p>
        </div>
      `
    });
    return result;
  } catch (error) {
    console.error("Failed to send admin notification email:", error);
    throw error;
  }
}
async function sendReplyEmail(data) {
  try {
    const result = await resend.emails.send({
      from: "noreply@majidkhanmohmand.com",
      to: data.email,
      subject: `Re: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reply to Your Message</h2>
          <p>Hi ${data.name},</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>${data.replyMessage.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p>Best regards,<br>Majid Khan Mohmand</p>
        </div>
      `
    });
    return result;
  } catch (error) {
    console.error("Failed to send reply email:", error);
    throw error;
  }
}
var resend;
var init_email = __esm({
  "server/email.ts"() {
    "use strict";
    init_env();
    resend = new Resend(ENV.resendApiKey);
  }
});

// server/_core/app.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { mysqlTable, int, varchar, text, timestamp, json, date, index, decimal, mysqlEnum, tinyint } from "drizzle-orm/mysql-core";
var aboutSection = mysqlTable("about_section", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).default("About Me").notNull(),
  content: text(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var activityLogs = mysqlTable("activity_logs", {
  id: int().autoincrement().notNull(),
  adminUserId: int("admin_user_id"),
  action: varchar({ length: 50 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: int("entity_id"),
  changes: json(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP")
});
var analyticsEvents = mysqlTable("analytics_events", {
  id: int().autoincrement().notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  eventName: varchar("event_name", { length: 255 }),
  pagePath: varchar("page_path", { length: 500 }),
  referrer: varchar({ length: 500 }),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  sessionId: varchar("session_id", { length: 100 }),
  metadata: json(),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP")
});
var blogs = mysqlTable("blogs", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  description: text(),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var certifications = mysqlTable("certifications", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  issuer: varchar({ length: 255 }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  issueDate: date("issue_date", { mode: "string" }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  expiryDate: date("expiry_date", { mode: "string" }),
  credentialUrl: varchar("credential_url", { length: 500 }),
  credentialId: varchar("credential_id", { length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var channels = mysqlTable("channels", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  category: varchar({ length: 100 }).notNull(),
  flagEmoji: varchar("flag_emoji", { length: 10 }),
  description: text(),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var colorPalettes = mysqlTable(
  "color_palettes",
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    primaryColor: varchar("primary_color", { length: 50 }).notNull(),
    accentColor: varchar("accent_color", { length: 50 }).notNull(),
    backgroundColor: varchar("background_color", { length: 50 }).notNull(),
    foregroundColor: varchar("foreground_color", { length: 50 }).notNull(),
    cardBackgroundColor: varchar("card_background_color", { length: 50 }).notNull(),
    borderColor: varchar("border_color", { length: 50 }).notNull(),
    successColor: varchar("success_color", { length: 50 }).default("#10B981"),
    warningColor: varchar("warning_color", { length: 50 }).default("#F59E0B"),
    errorColor: varchar("error_color", { length: 50 }).default("#EF4444"),
    isActive: tinyint("is_active").default(0),
    createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
  },
  (table) => [
    index("color_palettes_name_unique").on(table.name)
  ]
);
var companies = mysqlTable("companies", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  description: text(),
  logoUrl: varchar("logo_url", { length: 500 }),
  role: varchar({ length: 255 }),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var contactSubmissions = mysqlTable("contact_submissions", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 320 }).notNull(),
  subject: varchar({ length: 255 }).notNull(),
  message: text().notNull(),
  phone: varchar({ length: 20 }),
  isRead: tinyint("is_read").default(0),
  isReplied: tinyint("is_replied").default(0),
  replyMessage: text("reply_message"),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var education = mysqlTable("education", {
  id: int().autoincrement().notNull(),
  degree: varchar({ length: 255 }).notNull(),
  institution: varchar({ length: 255 }).notNull(),
  fieldOfStudy: varchar("field_of_study", { length: 255 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  startDate: date("start_date", { mode: "string" }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  endDate: date("end_date", { mode: "string" }),
  gpa: varchar({ length: 50 }),
  description: text(),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var experiences = mysqlTable("experiences", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  periodStart: date("period_start", { mode: "string" }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  periodEnd: date("period_end", { mode: "string" }),
  description: text(),
  technologies: json(),
  companyLogoUrl: varchar("company_logo_url", { length: 500 }),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var fiverrGigs = mysqlTable("fiverr_gigs", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  imageUrl: varchar("image_url", { length: 500 }),
  priceFrom: decimal("price_from", { precision: 10, scale: 2 }),
  priceTo: decimal("price_to", { precision: 10, scale: 2 }),
  currency: varchar({ length: 10 }).default("EUR"),
  rating: decimal({ precision: 3, scale: 1 }).default("5"),
  reviewCount: int("review_count").default(0),
  gigUrl: varchar("gig_url", { length: 500 }),
  category: varchar({ length: 100 }),
  tags: json(),
  order: int().default(0),
  isActive: tinyint("is_active").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var fiverrReviews = mysqlTable("fiverr_reviews", {
  id: int().autoincrement().notNull(),
  reviewerName: varchar("reviewer_name", { length: 255 }).notNull(),
  reviewerCountry: varchar("reviewer_country", { length: 100 }),
  reviewerCountryCode: varchar("reviewer_country_code", { length: 10 }),
  rating: decimal({ precision: 3, scale: 1 }).notNull(),
  comment: text(),
  gigTitle: varchar("gig_title", { length: 255 }),
  priceRange: varchar("price_range", { length: 100 }),
  duration: varchar({ length: 100 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  reviewDate: date("review_date", { mode: "string" }),
  order: int().default(0),
  isActive: tinyint("is_active").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var heroSection = mysqlTable("hero_section", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).default("Majid Khan Mohmand").notNull(),
  subtitle: text(),
  description: text(),
  ctaButton1Text: varchar("cta_button_1_text", { length: 100 }),
  ctaButton1Link: varchar("cta_button_1_link", { length: 500 }),
  ctaButton2Text: varchar("cta_button_2_text", { length: 100 }),
  ctaButton2Link: varchar("cta_button_2_link", { length: 500 }),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var hireOptions = mysqlTable("hire_options", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  iconType: varchar("icon_type", { length: 100 }),
  description: text(),
  order: int().default(0),
  isActive: tinyint("is_active").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var layoutTemplates = mysqlTable(
  "layout_templates",
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    description: text(),
    gridColumns: int("grid_columns").default(3),
    cardStyle: varchar("card_style", { length: 50 }).default("elevated"),
    spacing: varchar({ length: 50 }).default("medium"),
    alignment: varchar({ length: 50 }).default("center"),
    metadata: json(),
    createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
  },
  (table) => [
    index("layout_templates_name_unique").on(table.name)
  ]
);
var mediaLibrary = mysqlTable(
  "media_library",
  {
    id: int().autoincrement().notNull(),
    filename: varchar({ length: 255 }).notNull(),
    s3Key: varchar("s3_key", { length: 500 }).notNull(),
    s3Url: varchar("s3_url", { length: 500 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    fileSize: int("file_size"),
    width: int(),
    height: int(),
    uploadedBy: int("uploaded_by").references(() => users.id),
    createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
  },
  (table) => [
    index("media_library_s3_key_unique").on(table.s3Key)
  ]
);
var navigationItems = mysqlTable("navigation_items", {
  id: int().autoincrement().notNull(),
  label: varchar({ length: 100 }).notNull(),
  href: varchar({ length: 500 }).notNull(),
  displayOrder: int("display_order").default(0),
  isVisible: tinyint("is_visible").default(1),
  icon: varchar({ length: 100 }),
  target: varchar({ length: 20 }).default("_self"),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var projects = mysqlTable("projects", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  category: varchar({ length: 100 }),
  description: text(),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int().default(0),
  isFeatured: tinyint("is_featured").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var referrals = mysqlTable("referrals", {
  id: int().autoincrement().notNull(),
  title: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  description: text(),
  benefit: varchar({ length: 255 }),
  imageUrl: varchar("image_url", { length: 500 }),
  order: int().default(0),
  isActive: tinyint("is_active").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var sectionSettings = mysqlTable(
  "section_settings",
  {
    id: int().autoincrement().notNull(),
    sectionName: varchar("section_name", { length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    isVisible: tinyint("is_visible").default(1),
    displayOrder: int("display_order").default(0),
    layoutTemplate: varchar("layout_template", { length: 50 }).default("default"),
    customTitle: varchar("custom_title", { length: 255 }),
    customDescription: text("custom_description"),
    backgroundColor: varchar("background_color", { length: 50 }),
    textColor: varchar("text_color", { length: 50 }),
    metadata: json(),
    createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
  },
  (table) => [
    index("section_settings_section_name_unique").on(table.sectionName)
  ]
);
var siteSettings = mysqlTable("site_settings", {
  id: int().autoincrement().notNull(),
  siteTitle: varchar("site_title", { length: 255 }).default("Majid Khan Mohmand").notNull(),
  siteDescription: text("site_description"),
  siteKeywords: json("site_keywords"),
  faviconUrl: varchar("favicon_url", { length: 500 }),
  ogImageUrl: varchar("og_image_url", { length: 500 }),
  themeMode: mysqlEnum("theme_mode", ["dark", "light", "auto"]).default("dark"),
  accentColor: varchar("accent_color", { length: 50 }).default("#FBBF24"),
  showAnalytics: tinyint("show_analytics").default(0),
  googleAnalyticsId: varchar("google_analytics_id", { length: 255 }),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var skills = mysqlTable("skills", {
  id: int().autoincrement().notNull(),
  category: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  icon: varchar({ length: 50 }),
  proficiencyLevel: mysqlEnum("proficiency_level", ["Beginner", "Intermediate", "Advanced", "Expert"]).default("Intermediate"),
  order: int().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var socialLinks = mysqlTable("social_links", {
  id: int().autoincrement().notNull(),
  platform: varchar({ length: 100 }).notNull(),
  url: varchar({ length: 500 }).notNull(),
  iconType: varchar("icon_type", { length: 100 }),
  order: int().default(0),
  isVisible: tinyint("is_visible").default(1),
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var themes = mysqlTable(
  "themes",
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    displayName: varchar("display_name", { length: 100 }).notNull(),
    description: text(),
    isPrebuilt: tinyint("is_prebuilt").default(1),
    colors: json().notNull(),
    typography: json(),
    layout: json(),
    thumbnail: varchar({ length: 500 }),
    isActive: tinyint("is_active").default(0),
    createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
  },
  (table) => [
    index("themes_name_unique").on(table.name)
  ]
);
var typographySettings = mysqlTable("typography_settings", {
  id: int().autoincrement().notNull(),
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
  createdAt: timestamp("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow()
});
var users = mysqlTable(
  "users",
  {
    id: int().autoincrement().notNull(),
    openId: varchar({ length: 64 }).notNull(),
    name: text(),
    email: varchar({ length: 320 }),
    loginMethod: varchar({ length: 64 }),
    role: mysqlEnum(["user", "admin"]).default("user").notNull(),
    createdAt: timestamp({ mode: "string" }).default("CURRENT_TIMESTAMP").notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().onUpdateNow().notNull(),
    lastSignedIn: timestamp({ mode: "string" }).default("CURRENT_TIMESTAMP").notNull()
  },
  (table) => [
    index("users_openId_unique").on(table.openId)
  ]
);

// server/db.ts
init_env();
import { asc } from "drizzle-orm";
import { eq, desc } from "drizzle-orm";
var _db = null;
async function getDb() {
  console.log(
    "[Database] Connecting... URL present:",
    !!process.env.DATABASE_URL
  );
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(asc(projects.order));
}
async function createProject(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(data);
  return result;
}
async function updateProject(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(projects).set(data).where(eq(projects.id, id));
}
async function deleteProject(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(projects).where(eq(projects.id, id));
}
async function getExperiences() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(experiences).orderBy(asc(experiences.order));
}
async function createExperience(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(experiences).values(data);
}
async function updateExperience(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(experiences).set(data).where(eq(experiences.id, id));
}
async function deleteExperience(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(experiences).where(eq(experiences.id, id));
}
async function getSkills() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(skills).orderBy(asc(skills.category), asc(skills.order));
}
async function getSkillsByCategory(category) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(skills).where(eq(skills.category, category)).orderBy(asc(skills.order));
}
async function createSkill(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(skills).values(data);
}
async function updateSkill(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(skills).set(data).where(eq(skills.id, id));
}
async function deleteSkill(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(skills).where(eq(skills.id, id));
}
async function getCertifications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(certifications).orderBy(asc(certifications.order));
}
async function createCertification(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(certifications).values(data);
}
async function updateCertification(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(certifications).set(data).where(eq(certifications.id, id));
}
async function deleteCertification(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(certifications).where(eq(certifications.id, id));
}
async function getEducation() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(education).orderBy(asc(education.order));
}
async function createEducation(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(education).values(data);
}
async function updateEducation(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(education).set(data).where(eq(education.id, id));
}
async function deleteEducation(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(education).where(eq(education.id, id));
}
async function getBlogs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogs).orderBy(asc(blogs.order));
}
async function createBlog(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(blogs).values(data);
}
async function updateBlog(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(blogs).set(data).where(eq(blogs.id, id));
}
async function deleteBlog(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(blogs).where(eq(blogs.id, id));
}
async function getCompanies() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(companies).orderBy(asc(companies.order));
}
async function createCompany(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(companies).values(data);
}
async function updateCompany(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(companies).set(data).where(eq(companies.id, id));
}
async function deleteCompany(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(companies).where(eq(companies.id, id));
}
async function getChannels() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(channels).orderBy(asc(channels.category), asc(channels.order));
}
async function getChannelsByCategory(category) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(channels).where(eq(channels.category, category)).orderBy(asc(channels.order));
}
async function createChannel(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(channels).values(data);
}
async function updateChannel(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(channels).set(data).where(eq(channels.id, id));
}
async function deleteChannel(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(channels).where(eq(channels.id, id));
}
async function getReferrals() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(referrals).where(eq(referrals.isActive, true)).orderBy(asc(referrals.order));
}
async function createReferral(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(referrals).values(data);
}
async function updateReferral(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(referrals).set(data).where(eq(referrals.id, id));
}
async function deleteReferral(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(referrals).where(eq(referrals.id, id));
}
async function getSocialLinks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(socialLinks).where(eq(socialLinks.isVisible, true)).orderBy(asc(socialLinks.order));
}
async function createSocialLink(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(socialLinks).values(data);
}
async function updateSocialLink(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
}
async function deleteSocialLink(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(socialLinks).where(eq(socialLinks.id, id));
}
async function getHireOptions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(hireOptions).where(eq(hireOptions.isActive, true)).orderBy(asc(hireOptions.order));
}
async function createHireOption(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(hireOptions).values(data);
}
async function updateHireOption(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(hireOptions).set(data).where(eq(hireOptions.id, id));
}
async function deleteHireOption(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(hireOptions).where(eq(hireOptions.id, id));
}
async function getSiteSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteSettings).limit(1);
  return result[0] || null;
}
async function updateSiteSettings(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSiteSettings();
  if (existing) {
    return db.update(siteSettings).set(data).where(eq(siteSettings.id, existing.id));
  } else {
    return db.insert(siteSettings).values(data);
  }
}
async function getHeroSection() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(heroSection).limit(1);
  return result[0] || null;
}
async function updateHeroSection(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getHeroSection();
  if (existing) {
    return db.update(heroSection).set(data).where(eq(heroSection.id, existing.id));
  } else {
    return db.insert(heroSection).values(data);
  }
}
async function getAboutSection() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(aboutSection).limit(1);
  return result[0] || null;
}
async function updateAboutSection(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getAboutSection();
  if (existing) {
    return db.update(aboutSection).set(data).where(eq(aboutSection.id, existing.id));
  } else {
    return db.insert(aboutSection).values(data);
  }
}
async function getActivityLogs(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(limit);
}
async function createContactSubmission(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(contactSubmissions).values(data);
}
async function getContactSubmissions(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.contactSubmissions.findMany({
    limit,
    offset,
    orderBy: (submissions, { desc: desc2 }) => desc2(submissions.createdAt)
  });
}
async function getContactSubmissionById(id) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.contactSubmissions.findFirst({
    where: (submissions, { eq: eq3 }) => eq3(submissions.id, id)
  });
}
async function markContactAsRead(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
}
async function replyToContact(id, replyMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(contactSubmissions).set({ isReplied: true, replyMessage }).where(eq(contactSubmissions.id, id));
}
async function deleteContactSubmission(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}
async function trackAnalyticsEvent(data) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(analyticsEvents).values(data);
}
async function getAnalyticsStats(days = 30) {
  const db = await getDb();
  if (!db)
    return {
      totalEvents: 0,
      pageViews: 0,
      clicks: 0,
      formSubmissions: 0,
      uniqueSessions: 0
    };
  const startDate = /* @__PURE__ */ new Date();
  startDate.setDate(startDate.getDate() - days);
  const events = await db.query.analyticsEvents.findMany({
    where: (events2, { gte: gte2 }) => gte2(events2.createdAt, startDate)
  });
  return {
    totalEvents: events.length,
    pageViews: events.filter((e) => e.eventType === "page_view").length,
    clicks: events.filter((e) => e.eventType === "click").length,
    formSubmissions: events.filter((e) => e.eventType === "form_submit").length,
    uniqueSessions: new Set(events.map((e) => e.sessionId)).size
  };
}
async function getAnalyticsEvents(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.analyticsEvents.findMany({
    limit,
    offset,
    orderBy: (events, { desc: desc2 }) => desc2(events.createdAt)
  });
}
async function getMediaFiles(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.mediaLibrary.findMany({
    limit,
    offset,
    orderBy: (media, { desc: desc2 }) => desc2(media.createdAt)
  });
}
async function deleteMediaFile(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}
async function createFiverrGig(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(fiverrGigs).values(data);
}
async function getFiverrGigs(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(fiverrGigs).orderBy(asc(fiverrGigs.order)).limit(limit).offset(offset);
}
async function updateFiverrGig(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(fiverrGigs).set(data).where(eq(fiverrGigs.id, id));
}
async function deleteFiverrGig(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(fiverrGigs).where(eq(fiverrGigs.id, id));
}
async function createFiverrReview(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(fiverrReviews).values(data);
}
async function getFiverrReviews(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(fiverrReviews).orderBy(asc(fiverrReviews.order)).limit(limit).offset(offset);
}
async function updateFiverrReview(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(fiverrReviews).set(data).where(eq(fiverrReviews.id, id));
}
async function deleteFiverrReview(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(fiverrReviews).where(eq(fiverrReviews.id, id));
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
init_env();
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers/no-code.ts
import { z as z2 } from "zod";

// server/no-code-db.ts
import { eq as eq2 } from "drizzle-orm";
async function getThemes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(themes);
}
async function getActiveTheme() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(themes).where(eq2(themes.isActive, true)).limit(1);
  return result[0] || null;
}
async function setActiveTheme(themeId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(themes).set({ isActive: false });
  return await db.update(themes).set({ isActive: true }).where(eq2(themes.id, themeId));
}
async function createTheme(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(themes).values({
    name: data.name,
    displayName: data.displayName,
    description: data.description,
    isPrebuilt: false,
    colors: data.colors,
    typography: data.typography,
    layout: data.layout
  });
}
async function updateTheme(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(themes).set(data).where(eq2(themes.id, id));
}
async function deleteTheme(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(themes).where(eq2(themes.id, id));
}
async function getSectionSettings() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(sectionSettings).orderBy(sectionSettings.displayOrder);
}
async function getSectionSetting(sectionName) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(sectionSettings).where(eq2(sectionSettings.sectionName, sectionName)).limit(1);
  return result[0] || null;
}
async function updateSectionSetting(sectionName, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSectionSetting(sectionName);
  if (existing) {
    return await db.update(sectionSettings).set(data).where(eq2(sectionSettings.sectionName, sectionName));
  } else {
    return await db.insert(sectionSettings).values({
      sectionName,
      displayName: data.displayName || sectionName,
      ...data
    });
  }
}
async function toggleSectionVisibility(sectionName) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const setting = await getSectionSetting(sectionName);
  if (!setting) return null;
  return await db.update(sectionSettings).set({ isVisible: !setting.isVisible }).where(eq2(sectionSettings.sectionName, sectionName));
}
async function reorderSections(sections) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const section of sections) {
    await updateSectionSetting(section.name, { displayOrder: section.order });
  }
}
async function initializeSectionSettings() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const defaultSections = [
    { sectionName: "hero", displayName: "Hero Section", displayOrder: 1 },
    { sectionName: "about", displayName: "About Me", displayOrder: 2 },
    { sectionName: "hire", displayName: "Hire Me", displayOrder: 3 },
    { sectionName: "experiences", displayName: "Professional Experience", displayOrder: 4 },
    { sectionName: "skills", displayName: "Technical Skills", displayOrder: 5 },
    { sectionName: "education", displayName: "Education", displayOrder: 6 },
    { sectionName: "certifications", displayName: "Certifications", displayOrder: 7 },
    { sectionName: "projects", displayName: "Featured Projects", displayOrder: 8 },
    { sectionName: "blogs", displayName: "My Blogs", displayOrder: 9 },
    { sectionName: "companies", displayName: "Companies & Ventures", displayOrder: 10 },
    { sectionName: "channels", displayName: "WhatsApp & Telegram Channels", displayOrder: 11 },
    { sectionName: "referrals", displayName: "Exclusive Referrals & Offers", displayOrder: 12 },
    { sectionName: "contact", displayName: "Contact Me", displayOrder: 13 }
  ];
  for (const section of defaultSections) {
    const existing = await getSectionSetting(section.sectionName);
    if (!existing) {
      await db.insert(sectionSettings).values({
        sectionName: section.sectionName,
        displayName: section.displayName,
        displayOrder: section.displayOrder,
        isVisible: true
      });
    }
  }
}
async function getNavigationItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(navigationItems).orderBy(navigationItems.displayOrder);
}
async function createNavigationItem(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(navigationItems).values({
    label: data.label,
    href: data.href,
    displayOrder: data.displayOrder || 0,
    isVisible: data.isVisible !== false,
    icon: data.icon,
    target: data.target || "_self"
  });
}
async function updateNavigationItem(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(navigationItems).set(data).where(eq2(navigationItems.id, id));
}
async function deleteNavigationItem(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(navigationItems).where(eq2(navigationItems.id, id));
}
async function reorderNavigationItems(items) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const item of items) {
    await db.update(navigationItems).set({ displayOrder: item.order }).where(eq2(navigationItems.id, item.id));
  }
}
async function initializeDefaultNavigation() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getNavigationItems();
  if (existing.length > 0) return;
  const defaultItems = [
    { label: "Projects", href: "#projects", displayOrder: 1 },
    { label: "Hire", href: "#hire", displayOrder: 2 },
    { label: "Skills", href: "#skills", displayOrder: 3 },
    { label: "Contact", href: "#contact", displayOrder: 4 }
  ];
  for (const item of defaultItems) {
    await createNavigationItem(item);
  }
}
async function getTypographySettings() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(typographySettings).limit(1);
  return result[0] || null;
}
async function updateTypographySettings(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getTypographySettings();
  if (existing) {
    return await db.update(typographySettings).set(data).where(eq2(typographySettings.id, existing.id));
  } else {
    return await db.insert(typographySettings).values(data);
  }
}
async function getColorPalettes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(colorPalettes);
}
async function getActiveColorPalette() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(colorPalettes).where(eq2(colorPalettes.isActive, true)).limit(1);
  return result[0] || null;
}
async function createColorPalette(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(colorPalettes).values({
    name: data.name,
    primaryColor: data.primaryColor,
    accentColor: data.accentColor,
    backgroundColor: data.backgroundColor,
    foregroundColor: data.foregroundColor,
    cardBackgroundColor: data.cardBackgroundColor,
    borderColor: data.borderColor,
    successColor: data.successColor,
    warningColor: data.warningColor,
    errorColor: data.errorColor
  });
}
async function setActiveColorPalette(paletteId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(colorPalettes).set({ isActive: false });
  return await db.update(colorPalettes).set({ isActive: true }).where(eq2(colorPalettes.id, paletteId));
}
async function updateColorPalette(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(colorPalettes).set(data).where(eq2(colorPalettes.id, id));
}
async function deleteColorPalette(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(colorPalettes).where(eq2(colorPalettes.id, id));
}
async function getLayoutTemplates() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(layoutTemplates);
}
async function createLayoutTemplate(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(layoutTemplates).values({
    name: data.name,
    displayName: data.displayName,
    description: data.description,
    gridColumns: data.gridColumns || 3,
    cardStyle: data.cardStyle || "elevated",
    spacing: data.spacing || "medium",
    alignment: data.alignment || "center",
    metadata: data.metadata
  });
}
async function updateLayoutTemplate(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(layoutTemplates).set(data).where(eq2(layoutTemplates.id, id));
}
async function deleteLayoutTemplate(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(layoutTemplates).where(eq2(layoutTemplates.id, id));
}
async function initializeDefaultLayouts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getLayoutTemplates();
  if (existing.length > 0) return;
  const defaultLayouts = [
    {
      name: "grid",
      displayName: "Grid",
      description: "3-column grid layout",
      gridColumns: 3,
      cardStyle: "elevated",
      spacing: "medium"
    },
    {
      name: "list",
      displayName: "List",
      description: "Single column list layout",
      gridColumns: 1,
      cardStyle: "outlined",
      spacing: "medium"
    },
    {
      name: "compact",
      displayName: "Compact",
      description: "Compact 2-column layout",
      gridColumns: 2,
      cardStyle: "filled",
      spacing: "compact"
    }
  ];
  for (const layout of defaultLayouts) {
    await createLayoutTemplate(layout);
  }
}

// server/routers/no-code.ts
var noCodeRouter = router({
  // ============================================================================
  // THEME MANAGEMENT
  // ============================================================================
  themes: router({
    getAll: adminProcedure.query(async () => {
      return await getThemes();
    }),
    getActive: adminProcedure.query(async () => {
      return await getActiveTheme();
    }),
    setActive: adminProcedure.input(z2.object({ themeId: z2.number() })).mutation(async ({ input }) => {
      await setActiveTheme(input.themeId);
      return { success: true };
    }),
    create: adminProcedure.input(
      z2.object({
        name: z2.string(),
        displayName: z2.string(),
        description: z2.string().optional(),
        colors: z2.record(z2.string(), z2.any()),
        typography: z2.record(z2.string(), z2.any()),
        layout: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await createTheme(input);
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await updateTheme(input.id, input.data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteTheme(input.id);
    })
  }),
  // ============================================================================
  // SECTION SETTINGS
  // ============================================================================
  sections: router({
    getAll: adminProcedure.query(async () => {
      return await getSectionSettings();
    }),
    get: adminProcedure.input(z2.object({ sectionName: z2.string() })).query(async ({ input }) => {
      return await getSectionSetting(input.sectionName);
    }),
    update: adminProcedure.input(
      z2.object({
        sectionName: z2.string(),
        data: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await updateSectionSetting(input.sectionName, input.data);
    }),
    toggleVisibility: adminProcedure.input(z2.object({ sectionName: z2.string() })).mutation(async ({ input }) => {
      return await toggleSectionVisibility(input.sectionName);
    }),
    reorder: adminProcedure.input(
      z2.object({
        sections: z2.array(z2.object({ name: z2.string(), order: z2.number() }))
      })
    ).mutation(async ({ input }) => {
      await reorderSections(input.sections);
      return { success: true };
    }),
    initialize: adminProcedure.mutation(async () => {
      await initializeSectionSettings();
      return { success: true };
    })
  }),
  // ============================================================================
  // NAVIGATION ITEMS
  // ============================================================================
  navigation: router({
    getAll: adminProcedure.query(async () => {
      return await getNavigationItems();
    }),
    create: adminProcedure.input(
      z2.object({
        label: z2.string(),
        href: z2.string(),
        displayOrder: z2.number().optional(),
        isVisible: z2.boolean().optional(),
        icon: z2.string().optional(),
        target: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      return await createNavigationItem(input);
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await updateNavigationItem(input.id, input.data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteNavigationItem(input.id);
    }),
    reorder: adminProcedure.input(
      z2.object({
        items: z2.array(z2.object({ id: z2.number(), order: z2.number() }))
      })
    ).mutation(async ({ input }) => {
      await reorderNavigationItems(input.items);
      return { success: true };
    }),
    initialize: adminProcedure.mutation(async () => {
      await initializeDefaultNavigation();
      return { success: true };
    })
  }),
  // ============================================================================
  // TYPOGRAPHY SETTINGS
  // ============================================================================
  typography: router({
    get: adminProcedure.query(async () => {
      return await getTypographySettings();
    }),
    update: adminProcedure.input(z2.record(z2.string(), z2.any())).mutation(async ({ input }) => {
      return await updateTypographySettings(input);
    })
  }),
  // ============================================================================
  // COLOR PALETTES
  // ============================================================================
  colors: router({
    getAll: adminProcedure.query(async () => {
      return await getColorPalettes();
    }),
    getActive: adminProcedure.query(async () => {
      return await getActiveColorPalette();
    }),
    create: adminProcedure.input(
      z2.object({
        name: z2.string(),
        primaryColor: z2.string(),
        accentColor: z2.string(),
        backgroundColor: z2.string(),
        foregroundColor: z2.string(),
        cardBackgroundColor: z2.string(),
        borderColor: z2.string(),
        successColor: z2.string().optional(),
        warningColor: z2.string().optional(),
        errorColor: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      return await createColorPalette(input);
    }),
    setActive: adminProcedure.input(z2.object({ paletteId: z2.number() })).mutation(async ({ input }) => {
      await setActiveColorPalette(input.paletteId);
      return { success: true };
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await updateColorPalette(input.id, input.data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteColorPalette(input.id);
    })
  }),
  // ============================================================================
  // LAYOUT TEMPLATES
  // ============================================================================
  layouts: router({
    getAll: adminProcedure.query(async () => {
      return await getLayoutTemplates();
    }),
    create: adminProcedure.input(
      z2.object({
        name: z2.string(),
        displayName: z2.string(),
        description: z2.string().optional(),
        gridColumns: z2.number().optional(),
        cardStyle: z2.string().optional(),
        spacing: z2.string().optional(),
        alignment: z2.string().optional(),
        metadata: z2.record(z2.string(), z2.any()).optional()
      })
    ).mutation(async ({ input }) => {
      return await createLayoutTemplate(input);
    }),
    update: adminProcedure.input(
      z2.object({
        id: z2.number(),
        data: z2.record(z2.string(), z2.any())
      })
    ).mutation(async ({ input }) => {
      return await updateLayoutTemplate(input.id, input.data);
    }),
    delete: adminProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      return await deleteLayoutTemplate(input.id);
    }),
    initialize: adminProcedure.mutation(async () => {
      await initializeDefaultLayouts();
      return { success: true };
    })
  })
});

// server/routers.ts
import { z as z3 } from "zod";
import { TRPCError as TRPCError3 } from "@trpc/server";
var ProjectSchema = z3.object({
  title: z3.string().min(1),
  url: z3.string().url(),
  category: z3.string().optional(),
  description: z3.string().optional(),
  imageUrl: z3.string().optional(),
  order: z3.number().optional(),
  isFeatured: z3.boolean().optional()
});
var ExperienceSchema = z3.object({
  title: z3.string().min(1),
  company: z3.string().min(1),
  location: z3.string().optional(),
  periodStart: z3.date().optional(),
  periodEnd: z3.date().optional(),
  description: z3.string().optional(),
  technologies: z3.array(z3.string()).optional(),
  companyLogoUrl: z3.string().optional(),
  order: z3.number().optional()
});
var SkillSchema = z3.object({
  category: z3.string().min(1),
  name: z3.string().min(1),
  icon: z3.string().optional(),
  proficiencyLevel: z3.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  order: z3.number().optional()
});
var CertificationSchema = z3.object({
  title: z3.string().min(1),
  issuer: z3.string().min(1),
  issueDate: z3.date().optional(),
  expiryDate: z3.date().optional(),
  credentialUrl: z3.string().optional(),
  credentialId: z3.string().optional(),
  imageUrl: z3.string().optional(),
  order: z3.number().optional()
});
var EducationSchema = z3.object({
  degree: z3.string().min(1),
  institution: z3.string().min(1),
  fieldOfStudy: z3.string().optional(),
  startDate: z3.date().optional(),
  endDate: z3.date().optional(),
  gpa: z3.string().optional(),
  description: z3.string().optional(),
  order: z3.number().optional()
});
var BlogSchema = z3.object({
  title: z3.string().min(1),
  url: z3.string().url(),
  description: z3.string().optional(),
  imageUrl: z3.string().optional(),
  order: z3.number().optional()
});
var CompanySchema = z3.object({
  name: z3.string().min(1),
  url: z3.string().url(),
  description: z3.string().optional(),
  logoUrl: z3.string().optional(),
  role: z3.string().optional(),
  order: z3.number().optional()
});
var ChannelSchema = z3.object({
  title: z3.string().min(1),
  url: z3.string().url(),
  category: z3.string().min(1),
  flagEmoji: z3.string().optional(),
  description: z3.string().optional(),
  order: z3.number().optional()
});
var ReferralSchema = z3.object({
  title: z3.string().min(1),
  url: z3.string().url(),
  description: z3.string().optional(),
  benefit: z3.string().optional(),
  imageUrl: z3.string().optional(),
  order: z3.number().optional(),
  isActive: z3.boolean().optional()
});
var SocialLinkSchema = z3.object({
  platform: z3.string().min(1),
  url: z3.string().url(),
  iconType: z3.string().optional(),
  order: z3.number().optional(),
  isVisible: z3.boolean().optional()
});
var HireOptionSchema = z3.object({
  title: z3.string().min(1),
  url: z3.string().url(),
  iconType: z3.string().optional(),
  description: z3.string().optional(),
  order: z3.number().optional(),
  isActive: z3.boolean().optional()
});
var HeroSectionSchema = z3.object({
  title: z3.string().optional(),
  subtitle: z3.string().optional(),
  description: z3.string().optional(),
  ctaButton1Text: z3.string().optional(),
  ctaButton1Link: z3.string().optional(),
  ctaButton2Text: z3.string().optional(),
  ctaButton2Link: z3.string().optional()
});
var AboutSectionSchema = z3.object({
  title: z3.string().optional(),
  content: z3.string().optional()
});
var SiteSettingsSchema = z3.object({
  siteTitle: z3.string().optional(),
  siteDescription: z3.string().optional(),
  siteKeywords: z3.array(z3.string()).optional(),
  faviconUrl: z3.string().optional(),
  ogImageUrl: z3.string().optional(),
  themeMode: z3.enum(["dark", "light", "auto"]).optional(),
  accentColor: z3.string().optional(),
  showAnalytics: z3.boolean().optional(),
  googleAnalyticsId: z3.string().optional()
});
var adminProcedure2 = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return next({ ctx });
});
var contactRouter = router({
  submit: publicProcedure.input(
    z3.object({
      name: z3.string().min(2),
      email: z3.string().email(),
      subject: z3.string().min(5),
      message: z3.string().min(10),
      phone: z3.string().optional()
    })
  ).mutation(async ({ input }) => {
    try {
      const { sendContactConfirmationEmail: sendContactConfirmationEmail2, sendAdminNotificationEmail: sendAdminNotificationEmail2 } = await Promise.resolve().then(() => (init_email(), email_exports));
      const result = await createContactSubmission(input);
      await sendContactConfirmationEmail2({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message
      }).catch(
        (err) => console.error("Failed to send confirmation email:", err)
      );
      await sendAdminNotificationEmail2({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message
      }).catch(
        (err) => console.error("Failed to send admin notification:", err)
      );
      await trackAnalyticsEvent({
        eventType: "form_submit",
        eventName: "contact_form_submitted",
        pagePath: "/contact",
        metadata: { name: input.name }
      });
      return { success: true };
    } catch (error) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to submit contact form"
      });
    }
  }),
  list: protectedProcedure.input(
    z3.object({
      limit: z3.number().default(50),
      offset: z3.number().default(0)
    })
  ).query(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await getContactSubmissions(input.limit, input.offset);
  }),
  getById: protectedProcedure.input(z3.number()).query(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await getContactSubmissionById(input);
  }),
  markAsRead: protectedProcedure.input(z3.number()).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await markContactAsRead(input);
  }),
  delete: protectedProcedure.input(z3.number()).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await deleteContactSubmission(input);
  }),
  reply: protectedProcedure.input(
    z3.object({
      id: z3.number(),
      replyMessage: z3.string().min(5)
    })
  ).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    try {
      const submission = await getContactSubmissionById(input.id);
      if (!submission) {
        throw new TRPCError3({
          code: "NOT_FOUND",
          message: "Submission not found"
        });
      }
      return await replyToContact(input.id, input.replyMessage);
    } catch (error) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send reply"
      });
    }
  })
});
var analyticsRouter = router({
  trackEvent: publicProcedure.input(
    z3.object({
      eventType: z3.string(),
      eventName: z3.string().optional(),
      pagePath: z3.string().optional(),
      sessionId: z3.string().optional()
    })
  ).mutation(async ({ input }) => {
    try {
      await trackAnalyticsEvent(input);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }),
  getStats: protectedProcedure.input(z3.object({ days: z3.number().default(30) })).query(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await getAnalyticsStats(input.days);
  }),
  getEvents: protectedProcedure.input(
    z3.object({
      limit: z3.number().default(100),
      offset: z3.number().default(0)
    })
  ).query(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await getAnalyticsEvents(input.limit, input.offset);
  })
});
var mediaRouter = router({
  list: protectedProcedure.input(
    z3.object({
      limit: z3.number().default(50),
      offset: z3.number().default(0)
    })
  ).query(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await getMediaFiles(input.limit, input.offset);
  }),
  delete: protectedProcedure.input(z3.number()).mutation(async ({ input, ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN" });
    }
    return await deleteMediaFile(input);
  })
});
var appRouter = router({
  system: systemRouter,
  analytics: analyticsRouter,
  contact: contactRouter,
  media: mediaRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
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
    getSkillsByCategory: publicProcedure.input(z3.object({ category: z3.string() })).query(({ input }) => getSkillsByCategory(input.category)),
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
    getChannelsByCategory: publicProcedure.input(z3.object({ category: z3.string() })).query(({ input }) => getChannelsByCategory(input.category)),
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
    getSiteSettings: publicProcedure.query(() => getSiteSettings())
  }),
  // ========================================================================
  // ADMIN CMS MUTATIONS - For admin panel to manage content
  // ========================================================================
  admin: router({
    // HERO SECTION
    updateHero: adminProcedure2.input(HeroSectionSchema).mutation(({ input }) => updateHeroSection(input)),
    // ABOUT SECTION
    updateAbout: adminProcedure2.input(AboutSectionSchema).mutation(({ input }) => updateAboutSection(input)),
    // PROJECTS
    createProject: adminProcedure2.input(ProjectSchema).mutation(({ input }) => createProject(input)),
    updateProject: adminProcedure2.input(z3.object({ id: z3.number(), data: ProjectSchema.partial() })).mutation(({ input }) => updateProject(input.id, input.data)),
    deleteProject: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteProject(input.id)),
    // EXPERIENCES
    createExperience: adminProcedure2.input(ExperienceSchema).mutation(({ input }) => createExperience(input)),
    updateExperience: adminProcedure2.input(z3.object({ id: z3.number(), data: ExperienceSchema.partial() })).mutation(({ input }) => updateExperience(input.id, input.data)),
    deleteExperience: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteExperience(input.id)),
    // SKILLS
    createSkill: adminProcedure2.input(SkillSchema).mutation(({ input }) => createSkill(input)),
    updateSkill: adminProcedure2.input(z3.object({ id: z3.number(), data: SkillSchema.partial() })).mutation(({ input }) => updateSkill(input.id, input.data)),
    deleteSkill: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteSkill(input.id)),
    // CERTIFICATIONS
    createCertification: adminProcedure2.input(CertificationSchema).mutation(({ input }) => createCertification(input)),
    updateCertification: adminProcedure2.input(z3.object({ id: z3.number(), data: CertificationSchema.partial() })).mutation(({ input }) => updateCertification(input.id, input.data)),
    deleteCertification: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteCertification(input.id)),
    // EDUCATION
    createEducation: adminProcedure2.input(EducationSchema).mutation(({ input }) => createEducation(input)),
    updateEducation: adminProcedure2.input(z3.object({ id: z3.number(), data: EducationSchema.partial() })).mutation(({ input }) => updateEducation(input.id, input.data)),
    deleteEducation: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteEducation(input.id)),
    // BLOGS
    createBlog: adminProcedure2.input(BlogSchema).mutation(({ input }) => createBlog(input)),
    updateBlog: adminProcedure2.input(z3.object({ id: z3.number(), data: BlogSchema.partial() })).mutation(({ input }) => updateBlog(input.id, input.data)),
    deleteBlog: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteBlog(input.id)),
    // COMPANIES
    createCompany: adminProcedure2.input(CompanySchema).mutation(({ input }) => createCompany(input)),
    updateCompany: adminProcedure2.input(z3.object({ id: z3.number(), data: CompanySchema.partial() })).mutation(({ input }) => updateCompany(input.id, input.data)),
    deleteCompany: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteCompany(input.id)),
    // CHANNELS
    createChannel: adminProcedure2.input(ChannelSchema).mutation(({ input }) => createChannel(input)),
    updateChannel: adminProcedure2.input(z3.object({ id: z3.number(), data: ChannelSchema.partial() })).mutation(({ input }) => updateChannel(input.id, input.data)),
    deleteChannel: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteChannel(input.id)),
    // REFERRALS
    createReferral: adminProcedure2.input(ReferralSchema).mutation(({ input }) => createReferral(input)),
    updateReferral: adminProcedure2.input(z3.object({ id: z3.number(), data: ReferralSchema.partial() })).mutation(({ input }) => updateReferral(input.id, input.data)),
    deleteReferral: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteReferral(input.id)),
    // SOCIAL LINKS
    createSocialLink: adminProcedure2.input(SocialLinkSchema).mutation(({ input }) => createSocialLink(input)),
    updateSocialLink: adminProcedure2.input(z3.object({ id: z3.number(), data: SocialLinkSchema.partial() })).mutation(({ input }) => updateSocialLink(input.id, input.data)),
    deleteSocialLink: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteSocialLink(input.id)),
    // HIRE OPTIONS
    createHireOption: adminProcedure2.input(HireOptionSchema).mutation(({ input }) => createHireOption(input)),
    updateHireOption: adminProcedure2.input(z3.object({ id: z3.number(), data: HireOptionSchema.partial() })).mutation(({ input }) => updateHireOption(input.id, input.data)),
    deleteHireOption: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteHireOption(input.id)),
    // SITE SETTINGS
    updateSiteSettings: adminProcedure2.input(SiteSettingsSchema).mutation(({ input }) => updateSiteSettings(input)),
    // ACTIVITY LOGS
    getActivityLogs: adminProcedure2.input(z3.object({ limit: z3.number().optional() })).query(({ input }) => getActivityLogs(input.limit)),
    // FIVERR GIGS
    createFiverrGig: adminProcedure2.input(
      z3.object({
        title: z3.string(),
        description: z3.string().optional(),
        imageUrl: z3.string().optional(),
        priceFrom: z3.string().optional(),
        priceTo: z3.string().optional(),
        currency: z3.string().optional(),
        rating: z3.string().optional(),
        reviewCount: z3.number().optional(),
        gigUrl: z3.string().optional(),
        category: z3.string().optional(),
        tags: z3.array(z3.string()).optional(),
        order: z3.number().optional(),
        isActive: z3.boolean().optional()
      })
    ).mutation(({ input }) => createFiverrGig(input)),
    updateFiverrGig: adminProcedure2.input(
      z3.object({
        id: z3.number(),
        data: z3.object({
          title: z3.string().optional(),
          description: z3.string().optional(),
          imageUrl: z3.string().optional(),
          priceFrom: z3.string().optional(),
          priceTo: z3.string().optional(),
          currency: z3.string().optional(),
          rating: z3.string().optional(),
          reviewCount: z3.number().optional(),
          gigUrl: z3.string().optional(),
          category: z3.string().optional(),
          tags: z3.array(z3.string()).optional(),
          order: z3.number().optional(),
          isActive: z3.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateFiverrGig(input.id, input.data)),
    deleteFiverrGig: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteFiverrGig(input.id)),
    // FIVERR REVIEWS
    createFiverrReview: adminProcedure2.input(
      z3.object({
        reviewerName: z3.string(),
        reviewerCountry: z3.string().optional(),
        reviewerCountryCode: z3.string().optional(),
        rating: z3.string(),
        comment: z3.string().optional(),
        gigTitle: z3.string().optional(),
        priceRange: z3.string().optional(),
        duration: z3.string().optional(),
        reviewDate: z3.date().optional(),
        order: z3.number().optional(),
        isActive: z3.boolean().optional()
      })
    ).mutation(({ input }) => createFiverrReview(input)),
    updateFiverrReview: adminProcedure2.input(
      z3.object({
        id: z3.number(),
        data: z3.object({
          reviewerName: z3.string().optional(),
          reviewerCountry: z3.string().optional(),
          reviewerCountryCode: z3.string().optional(),
          rating: z3.string().optional(),
          comment: z3.string().optional(),
          gigTitle: z3.string().optional(),
          priceRange: z3.string().optional(),
          duration: z3.string().optional(),
          reviewDate: z3.date().optional(),
          order: z3.number().optional(),
          isActive: z3.boolean().optional()
        })
      })
    ).mutation(({ input }) => updateFiverrReview(input.id, input.data)),
    deleteFiverrReview: adminProcedure2.input(z3.object({ id: z3.number() })).mutation(({ input }) => deleteFiverrReview(input.id))
  }),
  // NO-CODE ADMIN SYSTEM
  noCode: noCodeRouter
});

// server/_core/context.ts
async function createContext(opts) {
  console.log("[Context] Creating context. NODE_ENV:", process.env.NODE_ENV);
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  if (!user && process.env.NODE_ENV === "development") {
    user = {
      id: 1,
      openId: "RKQSCfoVQPWWPKefqa9C7s",
      name: "Majid Khan",
      email: "mohmandkhan@gmail.com",
      loginMethod: "google",
      role: "admin",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastSignedIn: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/app.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

// api/index.ts
var index_default = app;
export {
  index_default as default
};
