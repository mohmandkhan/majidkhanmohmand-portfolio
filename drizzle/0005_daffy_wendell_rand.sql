ALTER TABLE `color_palettes` DROP INDEX `color_palettes_name_unique`;--> statement-breakpoint
ALTER TABLE `layout_templates` DROP INDEX `layout_templates_name_unique`;--> statement-breakpoint
ALTER TABLE `media_library` DROP INDEX `media_library_s3_key_unique`;--> statement-breakpoint
ALTER TABLE `section_settings` DROP INDEX `section_settings_section_name_unique`;--> statement-breakpoint
ALTER TABLE `themes` DROP INDEX `themes_name_unique`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `about_section` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `activity_logs` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `analytics_events` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `blogs` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `certifications` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `channels` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `color_palettes` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `companies` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `contact_submissions` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `education` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `experiences` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `fiverr_gigs` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `fiverr_reviews` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `hero_section` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `hire_options` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `layout_templates` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `media_library` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `navigation_items` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `projects` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `referrals` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `section_settings` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `site_settings` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `skills` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `social_links` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `themes` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `typography_settings` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `users` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `activity_logs` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `analytics_events` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `blogs` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `certifications` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `channels` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `color_palettes` MODIFY COLUMN `is_active` tinyint;--> statement-breakpoint
ALTER TABLE `color_palettes` MODIFY COLUMN `is_active` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `color_palettes` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `companies` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `contact_submissions` MODIFY COLUMN `is_read` tinyint;--> statement-breakpoint
ALTER TABLE `contact_submissions` MODIFY COLUMN `is_read` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `contact_submissions` MODIFY COLUMN `is_replied` tinyint;--> statement-breakpoint
ALTER TABLE `contact_submissions` MODIFY COLUMN `is_replied` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `contact_submissions` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `education` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `experiences` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `fiverr_gigs` MODIFY COLUMN `rating` decimal(3,1) DEFAULT '5';--> statement-breakpoint
ALTER TABLE `fiverr_gigs` MODIFY COLUMN `is_active` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `fiverr_gigs` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `fiverr_reviews` MODIFY COLUMN `is_active` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `fiverr_reviews` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `hire_options` MODIFY COLUMN `is_active` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `hire_options` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `layout_templates` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `media_library` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `navigation_items` MODIFY COLUMN `is_visible` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `navigation_items` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `is_featured` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `projects` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `referrals` MODIFY COLUMN `is_active` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `referrals` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `section_settings` MODIFY COLUMN `is_visible` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `section_settings` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `site_settings` MODIFY COLUMN `show_analytics` tinyint;--> statement-breakpoint
ALTER TABLE `site_settings` MODIFY COLUMN `show_analytics` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `skills` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `social_links` MODIFY COLUMN `is_visible` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `social_links` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `themes` MODIFY COLUMN `is_prebuilt` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `themes` MODIFY COLUMN `is_active` tinyint;--> statement-breakpoint
ALTER TABLE `themes` MODIFY COLUMN `is_active` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `themes` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `typography_settings` MODIFY COLUMN `created_at` timestamp DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `lastSignedIn` timestamp NOT NULL DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
CREATE INDEX `color_palettes_name_unique` ON `color_palettes` (`name`);--> statement-breakpoint
CREATE INDEX `layout_templates_name_unique` ON `layout_templates` (`name`);--> statement-breakpoint
CREATE INDEX `media_library_s3_key_unique` ON `media_library` (`s3_key`);--> statement-breakpoint
CREATE INDEX `section_settings_section_name_unique` ON `section_settings` (`section_name`);--> statement-breakpoint
CREATE INDEX `themes_name_unique` ON `themes` (`name`);--> statement-breakpoint
CREATE INDEX `users_openId_unique` ON `users` (`openId`);