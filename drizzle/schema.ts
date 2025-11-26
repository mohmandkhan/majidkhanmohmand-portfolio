import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, text, timestamp, json, date, index, decimal, foreignKey, mysqlEnum, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const aboutSection = mysqlTable("about_section", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).default('About Me').notNull(),
	content: text(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const activityLogs = mysqlTable("activity_logs", {
	id: int().autoincrement().notNull(),
	adminUserId: int("admin_user_id"),
	action: varchar({ length: 50 }).notNull(),
	entityType: varchar("entity_type", { length: 100 }).notNull(),
	entityId: int("entity_id"),
	changes: json(),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
});

export const analyticsEvents = mysqlTable("analytics_events", {
	id: int().autoincrement().notNull(),
	eventType: varchar("event_type", { length: 100 }).notNull(),
	eventName: varchar("event_name", { length: 255 }),
	pagePath: varchar("page_path", { length: 500 }),
	referrer: varchar({ length: 500 }),
	userAgent: text("user_agent"),
	ipAddress: varchar("ip_address", { length: 45 }),
	sessionId: varchar("session_id", { length: 100 }),
	metadata: json(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
});

export const blogs = mysqlTable("blogs", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	description: text(),
	imageUrl: varchar("image_url", { length: 500 }),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const certifications = mysqlTable("certifications", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	issuer: varchar({ length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	issueDate: date("issue_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	expiryDate: date("expiry_date", { mode: 'string' }),
	credentialUrl: varchar("credential_url", { length: 500 }),
	credentialId: varchar("credential_id", { length: 255 }),
	imageUrl: varchar("image_url", { length: 500 }),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const channels = mysqlTable("channels", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	category: varchar({ length: 100 }).notNull(),
	flagEmoji: varchar("flag_emoji", { length: 10 }),
	description: text(),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const colorPalettes = mysqlTable("color_palettes", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	primaryColor: varchar("primary_color", { length: 50 }).notNull(),
	accentColor: varchar("accent_color", { length: 50 }).notNull(),
	backgroundColor: varchar("background_color", { length: 50 }).notNull(),
	foregroundColor: varchar("foreground_color", { length: 50 }).notNull(),
	cardBackgroundColor: varchar("card_background_color", { length: 50 }).notNull(),
	borderColor: varchar("border_color", { length: 50 }).notNull(),
	successColor: varchar("success_color", { length: 50 }).default('#10B981'),
	warningColor: varchar("warning_color", { length: 50 }).default('#F59E0B'),
	errorColor: varchar("error_color", { length: 50 }).default('#EF4444'),
	isActive: tinyint("is_active").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("color_palettes_name_unique").on(table.name),
]);

export const companies = mysqlTable("companies", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	description: text(),
	logoUrl: varchar("logo_url", { length: 500 }),
	role: varchar({ length: 255 }),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const contactSubmissions = mysqlTable("contact_submissions", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 320 }).notNull(),
	subject: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	phone: varchar({ length: 20 }),
	isRead: tinyint("is_read").default(0),
	isReplied: tinyint("is_replied").default(0),
	replyMessage: text("reply_message"),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const education = mysqlTable("education", {
	id: int().autoincrement().notNull(),
	degree: varchar({ length: 255 }).notNull(),
	institution: varchar({ length: 255 }).notNull(),
	fieldOfStudy: varchar("field_of_study", { length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	gpa: varchar({ length: 50 }),
	description: text(),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const experiences = mysqlTable("experiences", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	company: varchar({ length: 255 }).notNull(),
	location: varchar({ length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	periodStart: date("period_start", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	periodEnd: date("period_end", { mode: 'string' }),
	description: text(),
	technologies: json(),
	companyLogoUrl: varchar("company_logo_url", { length: 500 }),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const fiverrGigs = mysqlTable("fiverr_gigs", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	imageUrl: varchar("image_url", { length: 500 }),
	priceFrom: decimal("price_from", { precision: 10, scale: 2 }),
	priceTo: decimal("price_to", { precision: 10, scale: 2 }),
	currency: varchar({ length: 10 }).default('EUR'),
	rating: decimal({ precision: 3, scale: 1 }).default('5'),
	reviewCount: int("review_count").default(0),
	gigUrl: varchar("gig_url", { length: 500 }),
	category: varchar({ length: 100 }),
	tags: json(),
	order: int().default(0),
	isActive: tinyint("is_active").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const fiverrReviews = mysqlTable("fiverr_reviews", {
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
	reviewDate: date("review_date", { mode: 'string' }),
	order: int().default(0),
	isActive: tinyint("is_active").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const heroSection = mysqlTable("hero_section", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).default('Majid Khan Mohmand').notNull(),
	subtitle: text(),
	description: text(),
	ctaButton1Text: varchar("cta_button_1_text", { length: 100 }),
	ctaButton1Link: varchar("cta_button_1_link", { length: 500 }),
	ctaButton2Text: varchar("cta_button_2_text", { length: 100 }),
	ctaButton2Link: varchar("cta_button_2_link", { length: 500 }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const hireOptions = mysqlTable("hire_options", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	iconType: varchar("icon_type", { length: 100 }),
	description: text(),
	order: int().default(0),
	isActive: tinyint("is_active").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const layoutTemplates = mysqlTable("layout_templates", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 100 }).notNull(),
	displayName: varchar("display_name", { length: 100 }).notNull(),
	description: text(),
	gridColumns: int("grid_columns").default(3),
	cardStyle: varchar("card_style", { length: 50 }).default('elevated'),
	spacing: varchar({ length: 50 }).default('medium'),
	alignment: varchar({ length: 50 }).default('center'),
	metadata: json(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("layout_templates_name_unique").on(table.name),
]);

export const mediaLibrary = mysqlTable("media_library", {
	id: int().autoincrement().notNull(),
	filename: varchar({ length: 255 }).notNull(),
	s3Key: varchar("s3_key", { length: 500 }).notNull(),
	s3Url: varchar("s3_url", { length: 500 }).notNull(),
	mimeType: varchar("mime_type", { length: 100 }),
	fileSize: int("file_size"),
	width: int(),
	height: int(),
	uploadedBy: int("uploaded_by").references(() => users.id),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("media_library_s3_key_unique").on(table.s3Key),
]);

export const navigationItems = mysqlTable("navigation_items", {
	id: int().autoincrement().notNull(),
	label: varchar({ length: 100 }).notNull(),
	href: varchar({ length: 500 }).notNull(),
	displayOrder: int("display_order").default(0),
	isVisible: tinyint("is_visible").default(1),
	icon: varchar({ length: 100 }),
	target: varchar({ length: 20 }).default('_self'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const projects = mysqlTable("projects", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	category: varchar({ length: 100 }),
	description: text(),
	imageUrl: varchar("image_url", { length: 500 }),
	order: int().default(0),
	isFeatured: tinyint("is_featured").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const referrals = mysqlTable("referrals", {
	id: int().autoincrement().notNull(),
	title: varchar({ length: 255 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	description: text(),
	benefit: varchar({ length: 255 }),
	imageUrl: varchar("image_url", { length: 500 }),
	order: int().default(0),
	isActive: tinyint("is_active").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const sectionSettings = mysqlTable("section_settings", {
	id: int().autoincrement().notNull(),
	sectionName: varchar("section_name", { length: 100 }).notNull(),
	displayName: varchar("display_name", { length: 100 }).notNull(),
	isVisible: tinyint("is_visible").default(1),
	displayOrder: int("display_order").default(0),
	layoutTemplate: varchar("layout_template", { length: 50 }).default('default'),
	customTitle: varchar("custom_title", { length: 255 }),
	customDescription: text("custom_description"),
	backgroundColor: varchar("background_color", { length: 50 }),
	textColor: varchar("text_color", { length: 50 }),
	metadata: json(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("section_settings_section_name_unique").on(table.sectionName),
]);

export const siteSettings = mysqlTable("site_settings", {
	id: int().autoincrement().notNull(),
	siteTitle: varchar("site_title", { length: 255 }).default('Majid Khan Mohmand').notNull(),
	siteDescription: text("site_description"),
	siteKeywords: json("site_keywords"),
	faviconUrl: varchar("favicon_url", { length: 500 }),
	ogImageUrl: varchar("og_image_url", { length: 500 }),
	themeMode: mysqlEnum("theme_mode", ['dark','light','auto']).default('dark'),
	accentColor: varchar("accent_color", { length: 50 }).default('#FBBF24'),
	showAnalytics: tinyint("show_analytics").default(0),
	googleAnalyticsId: varchar("google_analytics_id", { length: 255 }),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const skills = mysqlTable("skills", {
	id: int().autoincrement().notNull(),
	category: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 50 }),
	proficiencyLevel: mysqlEnum("proficiency_level", ['Beginner','Intermediate','Advanced','Expert']).default('Intermediate'),
	order: int().default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const socialLinks = mysqlTable("social_links", {
	id: int().autoincrement().notNull(),
	platform: varchar({ length: 100 }).notNull(),
	url: varchar({ length: 500 }).notNull(),
	iconType: varchar("icon_type", { length: 100 }),
	order: int().default(0),
	isVisible: tinyint("is_visible").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const themes = mysqlTable("themes", {
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
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("themes_name_unique").on(table.name),
]);

export const typographySettings = mysqlTable("typography_settings", {
	id: int().autoincrement().notNull(),
	headingFontFamily: varchar("heading_font_family", { length: 100 }).default('Sora'),
	bodyFontFamily: varchar("body_font_family", { length: 100 }).default('Sora'),
	headingFontSize: varchar("heading_font_size", { length: 50 }).default('3rem'),
	subheadingFontSize: varchar("subheading_font_size", { length: 50 }).default('1.875rem'),
	bodyFontSize: varchar("body_font_size", { length: 50 }).default('1rem'),
	smallFontSize: varchar("small_font_size", { length: 50 }).default('0.875rem'),
	headingFontWeight: varchar("heading_font_weight", { length: 50 }).default('700'),
	bodyFontWeight: varchar("body_font_weight", { length: 50 }).default('400'),
	lineHeight: varchar("line_height", { length: 50 }).default('1.6'),
	letterSpacing: varchar("letter_spacing", { length: 50 }).default('0'),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP'),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
});

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	openId: varchar({ length: 64 }).notNull(),
	name: text(),
	email: varchar({ length: 320 }),
	loginMethod: varchar({ length: 64 }),
	role: mysqlEnum(['user','admin']).default('user').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	lastSignedIn: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("users_openId_unique").on(table.openId),
]);
