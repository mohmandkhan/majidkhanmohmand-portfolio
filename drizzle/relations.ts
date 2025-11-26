import { relations } from "drizzle-orm/relations";
import { users, mediaLibrary } from "./schema";

export const mediaLibraryRelations = relations(mediaLibrary, ({one}) => ({
	user: one(users, {
		fields: [mediaLibrary.uploadedBy],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	mediaLibraries: many(mediaLibrary),
}));