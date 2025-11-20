import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { db } from "./db";
import {
  projectsTable,
  experiencesTable,
  skillsTable,
  certificationsTable,
  educationTable,
  blogsTable,
  companiesTable,
  channelsTable,
  referralsTable,
  socialLinksTable,
  hireOptionsTable,
} from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Admin CMS Operations", () => {
  // ============================================================================
  // PROJECTS TESTS
  // ============================================================================

  describe("Projects", () => {
    let projectId: number;

    it("should create a project", async () => {
      const result = await db
        .insert(projectsTable)
        .values({
          title: "Test Project",
          url: "https://example.com/project",
          category: "Web Development",
          description: "A test project",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Test Project");
      projectId = result[0].id;
    });

    it("should read a project", async () => {
      const result = await db.query.projectsTable.findFirst({
        where: eq(projectsTable.id, projectId),
      });

      expect(result).toBeDefined();
      expect(result?.title).toBe("Test Project");
    });

    it("should update a project", async () => {
      const result = await db
        .update(projectsTable)
        .set({ title: "Updated Project" })
        .where(eq(projectsTable.id, projectId))
        .returning();

      expect(result[0].title).toBe("Updated Project");
    });

    it("should delete a project", async () => {
      await db.delete(projectsTable).where(eq(projectsTable.id, projectId));

      const result = await db.query.projectsTable.findFirst({
        where: eq(projectsTable.id, projectId),
      });

      expect(result).toBeUndefined();
    });

    it("should list all projects", async () => {
      // Create test projects
      await db.insert(projectsTable).values([
        {
          title: "Project 1",
          url: "https://example.com/p1",
          category: "Web",
          order: 1,
        },
        {
          title: "Project 2",
          url: "https://example.com/p2",
          category: "Mobile",
          order: 2,
        },
      ]);

      const result = await db.query.projectsTable.findMany();
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ============================================================================
  // EXPERIENCES TESTS
  // ============================================================================

  describe("Experiences", () => {
    let experienceId: number;

    it("should create an experience", async () => {
      const result = await db
        .insert(experiencesTable)
        .values({
          title: "Senior Developer",
          company: "Tech Company",
          location: "Remote",
          description: "Led development team",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Senior Developer");
      experienceId = result[0].id;
    });

    it("should read an experience", async () => {
      const result = await db.query.experiencesTable.findFirst({
        where: eq(experiencesTable.id, experienceId),
      });

      expect(result).toBeDefined();
      expect(result?.company).toBe("Tech Company");
    });

    it("should update an experience", async () => {
      const result = await db
        .update(experiencesTable)
        .set({ title: "Lead Developer" })
        .where(eq(experiencesTable.id, experienceId))
        .returning();

      expect(result[0].title).toBe("Lead Developer");
    });

    it("should delete an experience", async () => {
      await db.delete(experiencesTable).where(eq(experiencesTable.id, experienceId));

      const result = await db.query.experiencesTable.findFirst({
        where: eq(experiencesTable.id, experienceId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // SKILLS TESTS
  // ============================================================================

  describe("Skills", () => {
    let skillId: number;

    it("should create a skill", async () => {
      const result = await db
        .insert(skillsTable)
        .values({
          category: "Languages",
          name: "JavaScript",
          icon: "⚡",
          proficiencyLevel: "Expert",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("JavaScript");
      skillId = result[0].id;
    });

    it("should read a skill", async () => {
      const result = await db.query.skillsTable.findFirst({
        where: eq(skillsTable.id, skillId),
      });

      expect(result).toBeDefined();
      expect(result?.category).toBe("Languages");
    });

    it("should update a skill", async () => {
      const result = await db
        .update(skillsTable)
        .set({ proficiencyLevel: "Advanced" })
        .where(eq(skillsTable.id, skillId))
        .returning();

      expect(result[0].proficiencyLevel).toBe("Advanced");
    });

    it("should delete a skill", async () => {
      await db.delete(skillsTable).where(eq(skillsTable.id, skillId));

      const result = await db.query.skillsTable.findFirst({
        where: eq(skillsTable.id, skillId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // CERTIFICATIONS TESTS
  // ============================================================================

  describe("Certifications", () => {
    let certId: number;

    it("should create a certification", async () => {
      const result = await db
        .insert(certificationsTable)
        .values({
          title: "AWS Solutions Architect",
          issuer: "Amazon",
          credentialId: "AWS-123456",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("AWS Solutions Architect");
      certId = result[0].id;
    });

    it("should read a certification", async () => {
      const result = await db.query.certificationsTable.findFirst({
        where: eq(certificationsTable.id, certId),
      });

      expect(result).toBeDefined();
      expect(result?.issuer).toBe("Amazon");
    });

    it("should update a certification", async () => {
      const result = await db
        .update(certificationsTable)
        .set({ credentialId: "AWS-789012" })
        .where(eq(certificationsTable.id, certId))
        .returning();

      expect(result[0].credentialId).toBe("AWS-789012");
    });

    it("should delete a certification", async () => {
      await db.delete(certificationsTable).where(eq(certificationsTable.id, certId));

      const result = await db.query.certificationsTable.findFirst({
        where: eq(certificationsTable.id, certId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // EDUCATION TESTS
  // ============================================================================

  describe("Education", () => {
    let eduId: number;

    it("should create education", async () => {
      const result = await db
        .insert(educationTable)
        .values({
          degree: "Master's in Computer Science",
          institution: "University of Example",
          fieldOfStudy: "Computer Science",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].degree).toBe("Master's in Computer Science");
      eduId = result[0].id;
    });

    it("should read education", async () => {
      const result = await db.query.educationTable.findFirst({
        where: eq(educationTable.id, eduId),
      });

      expect(result).toBeDefined();
      expect(result?.institution).toBe("University of Example");
    });

    it("should update education", async () => {
      const result = await db
        .update(educationTable)
        .set({ gpa: "3.8" })
        .where(eq(educationTable.id, eduId))
        .returning();

      expect(result[0].gpa).toBe("3.8");
    });

    it("should delete education", async () => {
      await db.delete(educationTable).where(eq(educationTable.id, eduId));

      const result = await db.query.educationTable.findFirst({
        where: eq(educationTable.id, eduId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // BLOGS TESTS
  // ============================================================================

  describe("Blogs", () => {
    let blogId: number;

    it("should create a blog", async () => {
      const result = await db
        .insert(blogsTable)
        .values({
          title: "Getting Started with React",
          url: "https://blog.example.com/react",
          description: "A beginner's guide to React",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Getting Started with React");
      blogId = result[0].id;
    });

    it("should read a blog", async () => {
      const result = await db.query.blogsTable.findFirst({
        where: eq(blogsTable.id, blogId),
      });

      expect(result).toBeDefined();
      expect(result?.url).toBe("https://blog.example.com/react");
    });

    it("should update a blog", async () => {
      const result = await db
        .update(blogsTable)
        .set({ title: "Advanced React Patterns" })
        .where(eq(blogsTable.id, blogId))
        .returning();

      expect(result[0].title).toBe("Advanced React Patterns");
    });

    it("should delete a blog", async () => {
      await db.delete(blogsTable).where(eq(blogsTable.id, blogId));

      const result = await db.query.blogsTable.findFirst({
        where: eq(blogsTable.id, blogId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // COMPANIES TESTS
  // ============================================================================

  describe("Companies", () => {
    let companyId: number;

    it("should create a company", async () => {
      const result = await db
        .insert(companiesTable)
        .values({
          name: "Tech Startup Inc",
          url: "https://techstartup.com",
          description: "An innovative tech company",
          role: "Co-Founder",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Tech Startup Inc");
      companyId = result[0].id;
    });

    it("should read a company", async () => {
      const result = await db.query.companiesTable.findFirst({
        where: eq(companiesTable.id, companyId),
      });

      expect(result).toBeDefined();
      expect(result?.role).toBe("Co-Founder");
    });

    it("should update a company", async () => {
      const result = await db
        .update(companiesTable)
        .set({ role: "CEO" })
        .where(eq(companiesTable.id, companyId))
        .returning();

      expect(result[0].role).toBe("CEO");
    });

    it("should delete a company", async () => {
      await db.delete(companiesTable).where(eq(companiesTable.id, companyId));

      const result = await db.query.companiesTable.findFirst({
        where: eq(companiesTable.id, companyId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // CHANNELS TESTS
  // ============================================================================

  describe("Channels", () => {
    let channelId: number;

    it("should create a channel", async () => {
      const result = await db
        .insert(channelsTable)
        .values({
          title: "Tech News",
          url: "https://whatsapp.com/channel/123",
          category: "Technology",
          flagEmoji: "🇺🇸",
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Tech News");
      channelId = result[0].id;
    });

    it("should read a channel", async () => {
      const result = await db.query.channelsTable.findFirst({
        where: eq(channelsTable.id, channelId),
      });

      expect(result).toBeDefined();
      expect(result?.category).toBe("Technology");
    });

    it("should update a channel", async () => {
      const result = await db
        .update(channelsTable)
        .set({ flagEmoji: "🇵🇰" })
        .where(eq(channelsTable.id, channelId))
        .returning();

      expect(result[0].flagEmoji).toBe("🇵🇰");
    });

    it("should delete a channel", async () => {
      await db.delete(channelsTable).where(eq(channelsTable.id, channelId));

      const result = await db.query.channelsTable.findFirst({
        where: eq(channelsTable.id, channelId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // REFERRALS TESTS
  // ============================================================================

  describe("Referrals", () => {
    let referralId: number;

    it("should create a referral", async () => {
      const result = await db
        .insert(referralsTable)
        .values({
          title: "Exclusive Offer",
          url: "https://referral.example.com",
          benefit: "Get 50% off",
          isActive: true,
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Exclusive Offer");
      referralId = result[0].id;
    });

    it("should read a referral", async () => {
      const result = await db.query.referralsTable.findFirst({
        where: eq(referralsTable.id, referralId),
      });

      expect(result).toBeDefined();
      expect(result?.benefit).toBe("Get 50% off");
    });

    it("should update a referral", async () => {
      const result = await db
        .update(referralsTable)
        .set({ isActive: false })
        .where(eq(referralsTable.id, referralId))
        .returning();

      expect(result[0].isActive).toBe(false);
    });

    it("should delete a referral", async () => {
      await db.delete(referralsTable).where(eq(referralsTable.id, referralId));

      const result = await db.query.referralsTable.findFirst({
        where: eq(referralsTable.id, referralId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // SOCIAL LINKS TESTS
  // ============================================================================

  describe("Social Links", () => {
    let socialId: number;

    it("should create a social link", async () => {
      const result = await db
        .insert(socialLinksTable)
        .values({
          platform: "Twitter",
          url: "https://twitter.com/example",
          iconType: "twitter",
          isVisible: true,
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].platform).toBe("Twitter");
      socialId = result[0].id;
    });

    it("should read a social link", async () => {
      const result = await db.query.socialLinksTable.findFirst({
        where: eq(socialLinksTable.id, socialId),
      });

      expect(result).toBeDefined();
      expect(result?.iconType).toBe("twitter");
    });

    it("should update a social link", async () => {
      const result = await db
        .update(socialLinksTable)
        .set({ isVisible: false })
        .where(eq(socialLinksTable.id, socialId))
        .returning();

      expect(result[0].isVisible).toBe(false);
    });

    it("should delete a social link", async () => {
      await db.delete(socialLinksTable).where(eq(socialLinksTable.id, socialId));

      const result = await db.query.socialLinksTable.findFirst({
        where: eq(socialLinksTable.id, socialId),
      });

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // HIRE OPTIONS TESTS
  // ============================================================================

  describe("Hire Options", () => {
    let hireId: number;

    it("should create a hire option", async () => {
      const result = await db
        .insert(hireOptionsTable)
        .values({
          title: "Contact via WhatsApp",
          url: "https://wa.me/1234567890",
          iconType: "whatsapp",
          description: "Quick contact via WhatsApp",
          isActive: true,
          order: 1,
        })
        .returning();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Contact via WhatsApp");
      hireId = result[0].id;
    });

    it("should read a hire option", async () => {
      const result = await db.query.hireOptionsTable.findFirst({
        where: eq(hireOptionsTable.id, hireId),
      });

      expect(result).toBeDefined();
      expect(result?.iconType).toBe("whatsapp");
    });

    it("should update a hire option", async () => {
      const result = await db
        .update(hireOptionsTable)
        .set({ isActive: false })
        .where(eq(hireOptionsTable.id, hireId))
        .returning();

      expect(result[0].isActive).toBe(false);
    });

    it("should delete a hire option", async () => {
      await db.delete(hireOptionsTable).where(eq(hireOptionsTable.id, hireId));

      const result = await db.query.hireOptionsTable.findFirst({
        where: eq(hireOptionsTable.id, hireId),
      });

      expect(result).toBeUndefined();
    });
  });
});
