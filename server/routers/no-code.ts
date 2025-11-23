/**
 * TRPC routers for no-code admin system
 * Handles themes, sections, navigation, and site configuration
 */

import { router, adminProcedure } from "../_core/trpc";
import { z } from "zod";
import * as noCoreDb from "../no-code-db";

export const noCodeRouter = router({
  // ============================================================================
  // THEME MANAGEMENT
  // ============================================================================

  themes: router({
    getAll: adminProcedure.query(async () => {
      return await noCoreDb.getThemes();
    }),

    getActive: adminProcedure.query(async () => {
      return await noCoreDb.getActiveTheme();
    }),

    setActive: adminProcedure
      .input(z.object({ themeId: z.number() }))
      .mutation(async ({ input }) => {
        await noCoreDb.setActiveTheme(input.themeId);
        return { success: true };
      }),

    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          displayName: z.string(),
          description: z.string().optional(),
          colors: z.record(z.string(), z.any()),
          typography: z.record(z.string(), z.any()),
          layout: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.createTheme(input);
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.updateTheme(input.id, input.data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await noCoreDb.deleteTheme(input.id);
      }),
  }),

  // ============================================================================
  // SECTION SETTINGS
  // ============================================================================

  sections: router({
    getAll: adminProcedure.query(async () => {
      return await noCoreDb.getSectionSettings();
    }),

    get: adminProcedure
      .input(z.object({ sectionName: z.string() }))
      .query(async ({ input }) => {
        return await noCoreDb.getSectionSetting(input.sectionName);
      }),

    update: adminProcedure
      .input(
        z.object({
          sectionName: z.string(),
          data: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.updateSectionSetting(input.sectionName, input.data);
      }),

    toggleVisibility: adminProcedure
      .input(z.object({ sectionName: z.string() }))
      .mutation(async ({ input }) => {
        return await noCoreDb.toggleSectionVisibility(input.sectionName);
      }),

    reorder: adminProcedure
      .input(
        z.object({
          sections: z.array(z.object({ name: z.string(), order: z.number() })),
        })
      )
      .mutation(async ({ input }) => {
        await noCoreDb.reorderSections(input.sections);
        return { success: true };
      }),

    initialize: adminProcedure.mutation(async () => {
      await noCoreDb.initializeSectionSettings();
      return { success: true };
    }),
  }),

  // ============================================================================
  // NAVIGATION ITEMS
  // ============================================================================

  navigation: router({
    getAll: adminProcedure.query(async () => {
      return await noCoreDb.getNavigationItems();
    }),

    create: adminProcedure
      .input(
        z.object({
          label: z.string(),
          href: z.string(),
          displayOrder: z.number().optional(),
          isVisible: z.boolean().optional(),
          icon: z.string().optional(),
          target: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.createNavigationItem(input);
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.updateNavigationItem(input.id, input.data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await noCoreDb.deleteNavigationItem(input.id);
      }),

    reorder: adminProcedure
      .input(
        z.object({
          items: z.array(z.object({ id: z.number(), order: z.number() })),
        })
      )
      .mutation(async ({ input }) => {
        await noCoreDb.reorderNavigationItems(input.items);
        return { success: true };
      }),

    initialize: adminProcedure.mutation(async () => {
      await noCoreDb.initializeDefaultNavigation();
      return { success: true };
    }),
  }),

  // ============================================================================
  // TYPOGRAPHY SETTINGS
  // ============================================================================

  typography: router({
    get: adminProcedure.query(async () => {
      return await noCoreDb.getTypographySettings();
    }),

    update: adminProcedure
      .input(z.record(z.string(), z.any()))
      .mutation(async ({ input }) => {
        return await noCoreDb.updateTypographySettings(input);
      }),
  }),

  // ============================================================================
  // COLOR PALETTES
  // ============================================================================

  colors: router({
    getAll: adminProcedure.query(async () => {
      return await noCoreDb.getColorPalettes();
    }),

    getActive: adminProcedure.query(async () => {
      return await noCoreDb.getActiveColorPalette();
    }),

    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          primaryColor: z.string(),
          accentColor: z.string(),
          backgroundColor: z.string(),
          foregroundColor: z.string(),
          cardBackgroundColor: z.string(),
          borderColor: z.string(),
          successColor: z.string().optional(),
          warningColor: z.string().optional(),
          errorColor: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.createColorPalette(input);
      }),

    setActive: adminProcedure
      .input(z.object({ paletteId: z.number() }))
      .mutation(async ({ input }) => {
        await noCoreDb.setActiveColorPalette(input.paletteId);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.updateColorPalette(input.id, input.data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await noCoreDb.deleteColorPalette(input.id);
      }),
  }),

  // ============================================================================
  // LAYOUT TEMPLATES
  // ============================================================================

  layouts: router({
    getAll: adminProcedure.query(async () => {
      return await noCoreDb.getLayoutTemplates();
    }),

    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          displayName: z.string(),
          description: z.string().optional(),
          gridColumns: z.number().optional(),
          cardStyle: z.string().optional(),
          spacing: z.string().optional(),
          alignment: z.string().optional(),
          metadata: z.record(z.string(), z.any()).optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.createLayoutTemplate(input);
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.record(z.string(), z.any()),
        })
      )
      .mutation(async ({ input }) => {
        return await noCoreDb.updateLayoutTemplate(input.id, input.data);
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await noCoreDb.deleteLayoutTemplate(input.id);
      }),

    initialize: adminProcedure.mutation(async () => {
      await noCoreDb.initializeDefaultLayouts();
      return { success: true };
    }),
  }),
});
