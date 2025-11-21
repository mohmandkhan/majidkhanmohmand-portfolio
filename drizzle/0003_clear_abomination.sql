CREATE TABLE `color_palettes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`primary_color` varchar(50) NOT NULL,
	`accent_color` varchar(50) NOT NULL,
	`background_color` varchar(50) NOT NULL,
	`foreground_color` varchar(50) NOT NULL,
	`card_background_color` varchar(50) NOT NULL,
	`border_color` varchar(50) NOT NULL,
	`success_color` varchar(50) DEFAULT '#10B981',
	`warning_color` varchar(50) DEFAULT '#F59E0B',
	`error_color` varchar(50) DEFAULT '#EF4444',
	`is_active` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `color_palettes_id` PRIMARY KEY(`id`),
	CONSTRAINT `color_palettes_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `layout_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`grid_columns` int DEFAULT 3,
	`card_style` varchar(50) DEFAULT 'elevated',
	`spacing` varchar(50) DEFAULT 'medium',
	`alignment` varchar(50) DEFAULT 'center',
	`metadata` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `layout_templates_id` PRIMARY KEY(`id`),
	CONSTRAINT `layout_templates_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `navigation_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(100) NOT NULL,
	`href` varchar(500) NOT NULL,
	`display_order` int DEFAULT 0,
	`is_visible` boolean DEFAULT true,
	`icon` varchar(100),
	`target` varchar(20) DEFAULT '_self',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `navigation_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `section_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section_name` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`is_visible` boolean DEFAULT true,
	`display_order` int DEFAULT 0,
	`layout_template` varchar(50) DEFAULT 'default',
	`custom_title` varchar(255),
	`custom_description` text,
	`background_color` varchar(50),
	`text_color` varchar(50),
	`metadata` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `section_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `section_settings_section_name_unique` UNIQUE(`section_name`)
);
--> statement-breakpoint
CREATE TABLE `themes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_prebuilt` boolean DEFAULT true,
	`colors` json NOT NULL,
	`typography` json,
	`layout` json,
	`thumbnail` varchar(500),
	`is_active` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `themes_id` PRIMARY KEY(`id`),
	CONSTRAINT `themes_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `typography_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`heading_font_family` varchar(100) DEFAULT 'Sora',
	`body_font_family` varchar(100) DEFAULT 'Sora',
	`heading_font_size` varchar(50) DEFAULT '3rem',
	`subheading_font_size` varchar(50) DEFAULT '1.875rem',
	`body_font_size` varchar(50) DEFAULT '1rem',
	`small_font_size` varchar(50) DEFAULT '0.875rem',
	`heading_font_weight` varchar(50) DEFAULT '700',
	`body_font_weight` varchar(50) DEFAULT '400',
	`line_height` varchar(50) DEFAULT '1.6',
	`letter_spacing` varchar(50) DEFAULT '0',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `typography_settings_id` PRIMARY KEY(`id`)
);
