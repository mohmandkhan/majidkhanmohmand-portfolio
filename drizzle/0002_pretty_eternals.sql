CREATE TABLE `analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`event_type` varchar(100) NOT NULL,
	`event_name` varchar(255),
	`page_path` varchar(500),
	`referrer` varchar(500),
	`user_agent` text,
	`ip_address` varchar(45),
	`session_id` varchar(100),
	`metadata` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`phone` varchar(20),
	`is_read` boolean DEFAULT false,
	`is_replied` boolean DEFAULT false,
	`reply_message` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`s3_key` varchar(500) NOT NULL,
	`s3_url` varchar(500) NOT NULL,
	`mime_type` varchar(100),
	`file_size` int,
	`width` int,
	`height` int,
	`uploaded_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_library_id` PRIMARY KEY(`id`),
	CONSTRAINT `media_library_s3_key_unique` UNIQUE(`s3_key`)
);
--> statement-breakpoint
ALTER TABLE `media_library` ADD CONSTRAINT `media_library_uploaded_by_users_id_fk` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;