/**
 * Database functions for no-code admin system
 * Handles themes, sections, navigation, and site configuration
 */

import { getDb } from "./db";
import {
  themes,
  sectionSettings,
  navigationItems,
  typographySettings,
  colorPalettes,
  layoutTemplates,
} from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { PREBUILT_THEMES } from "./themes";

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

export async function getThemes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(themes);
}

export async function getActiveTheme() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(themes).where(eq(themes.isActive, true)).limit(1);
  return result[0] || null;
}

export async function setActiveTheme(themeId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Deactivate all themes
  await db.update(themes).set({ isActive: false });
  // Activate selected theme
  return await db.update(themes).set({ isActive: true }).where(eq(themes.id, themeId));
}

export async function createTheme(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(themes).values({
    name: data.name,
    displayName: data.displayName,
    description: data.description,
    isPrebuilt: false,
    colors: data.colors,
    typography: data.typography,
    layout: data.layout,
  });
}

export async function updateTheme(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(themes).set(data).where(eq(themes.id, id));
}

export async function deleteTheme(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(themes).where(eq(themes.id, id));
}

export async function seedDefaultThemes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(themes).limit(1);
  if (existing.length > 0) return;

  for (const theme of PREBUILT_THEMES) {
    await db.insert(themes).values({
      name: theme.name,
      displayName: theme.displayName,
      description: theme.description,
      isPrebuilt: true,
      colors: theme.colors,
      typography: theme.typography,
      layout: theme.layout,
      isActive: theme.name === "modern",
    });
  }
}

// ============================================================================
// SECTION SETTINGS
// ============================================================================

export async function getSectionSettings() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(sectionSettings).orderBy(sectionSettings.displayOrder);
}

export async function getSectionSetting(sectionName: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db
    .select()
    .from(sectionSettings)
    .where(eq(sectionSettings.sectionName, sectionName))
    .limit(1);
  return result[0] || null;
}

export async function updateSectionSetting(sectionName: string, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSectionSetting(sectionName);
  if (existing) {
    return await db
      .update(sectionSettings)
      .set(data)
      .where(eq(sectionSettings.sectionName, sectionName));
  } else {
    return await db.insert(sectionSettings).values({
      sectionName,
      displayName: data.displayName || sectionName,
      ...data,
    });
  }
}

export async function toggleSectionVisibility(sectionName: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const setting = await getSectionSetting(sectionName);
  if (!setting) return null;
  return await db
    .update(sectionSettings)
    .set({ isVisible: !setting.isVisible })
    .where(eq(sectionSettings.sectionName, sectionName));
}

export async function reorderSections(sections: Array<{ name: string; order: number }>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const section of sections) {
    await updateSectionSetting(section.name, { displayOrder: section.order });
  }
}

export async function initializeSectionSettings() {
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
    { sectionName: "contact", displayName: "Contact Me", displayOrder: 13 },
  ];

  for (const section of defaultSections) {
    const existing = await getSectionSetting(section.sectionName);
    if (!existing) {
      await db.insert(sectionSettings).values({
        sectionName: section.sectionName,
        displayName: section.displayName,
        displayOrder: section.displayOrder,
        isVisible: true,
      });
    }
  }
}

// ============================================================================
// NAVIGATION ITEMS
// ============================================================================

export async function getNavigationItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(navigationItems).orderBy(navigationItems.displayOrder);
}

export async function createNavigationItem(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(navigationItems).values({
    label: data.label,
    href: data.href,
    displayOrder: data.displayOrder || 0,
    isVisible: data.isVisible !== false,
    icon: data.icon,
    target: data.target || "_self",
  });
}

export async function updateNavigationItem(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(navigationItems).set(data).where(eq(navigationItems.id, id));
}

export async function deleteNavigationItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(navigationItems).where(eq(navigationItems.id, id));
}

export async function reorderNavigationItems(items: Array<{ id: number; order: number }>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const item of items) {
    await db
      .update(navigationItems)
      .set({ displayOrder: item.order })
      .where(eq(navigationItems.id, item.id));
  }
}

export async function initializeDefaultNavigation() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getNavigationItems();
  if (existing.length > 0) return;

  const defaultItems = [
    { label: "Projects", href: "#projects", displayOrder: 1 },
    { label: "Hire", href: "#hire", displayOrder: 2 },
    { label: "Skills", href: "#skills", displayOrder: 3 },
    { label: "Contact", href: "#contact", displayOrder: 4 },
  ];

  for (const item of defaultItems) {
    await createNavigationItem(item);
  }
}

// ============================================================================
// TYPOGRAPHY SETTINGS
// ============================================================================

export async function getTypographySettings() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(typographySettings).limit(1);
  return result[0] || null;
}

export async function updateTypographySettings(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getTypographySettings();
  if (existing) {
    return await db.update(typographySettings).set(data).where(eq(typographySettings.id, existing.id));
  } else {
    return await db.insert(typographySettings).values(data);
  }
}

// ============================================================================
// COLOR PALETTES
// ============================================================================

export async function getColorPalettes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(colorPalettes);
}

export async function getActiveColorPalette() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(colorPalettes).where(eq(colorPalettes.isActive, true)).limit(1);
  return result[0] || null;
}

export async function createColorPalette(data: any) {
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
    errorColor: data.errorColor,
  });
}

export async function setActiveColorPalette(paletteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(colorPalettes).set({ isActive: false });
  return await db.update(colorPalettes).set({ isActive: true }).where(eq(colorPalettes.id, paletteId));
}

export async function updateColorPalette(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(colorPalettes).set(data).where(eq(colorPalettes.id, id));
}

export async function deleteColorPalette(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(colorPalettes).where(eq(colorPalettes.id, id));
}

// ============================================================================
// LAYOUT TEMPLATES
// ============================================================================

export async function getLayoutTemplates() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.select().from(layoutTemplates);
}

export async function createLayoutTemplate(data: any) {
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
    metadata: data.metadata,
  });
}

export async function updateLayoutTemplate(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(layoutTemplates).set(data).where(eq(layoutTemplates.id, id));
}

export async function deleteLayoutTemplate(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(layoutTemplates).where(eq(layoutTemplates.id, id));
}

export async function initializeDefaultLayouts() {
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
      spacing: "medium",
    },
    {
      name: "list",
      displayName: "List",
      description: "Single column list layout",
      gridColumns: 1,
      cardStyle: "outlined",
      spacing: "medium",
    },
    {
      name: "compact",
      displayName: "Compact",
      description: "Compact 2-column layout",
      gridColumns: 2,
      cardStyle: "filled",
      spacing: "compact",
    },
  ];

  for (const layout of defaultLayouts) {
    await createLayoutTemplate(layout);
  }
}

