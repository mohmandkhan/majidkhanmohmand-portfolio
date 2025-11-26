CREATE TABLE `fiverr_gigs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`image_url` varchar(500),
	`price_from` decimal(10,2),
	`price_to` decimal(10,2),
	`currency` varchar(10) DEFAULT 'EUR',
	`rating` decimal(3,1) DEFAULT 5,
	`review_count` int DEFAULT 0,
	`gig_url` varchar(500),
	`category` varchar(100),
	`tags` json,
	`order` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fiverr_gigs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fiverr_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reviewer_name` varchar(255) NOT NULL,
	`reviewer_country` varchar(100),
	`reviewer_country_code` varchar(10),
	`rating` decimal(3,1) NOT NULL,
	`comment` text,
	`gig_title` varchar(255),
	`price_range` varchar(100),
	`duration` varchar(100),
	`review_date` date,
	`order` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fiverr_reviews_id` PRIMARY KEY(`id`)
);
