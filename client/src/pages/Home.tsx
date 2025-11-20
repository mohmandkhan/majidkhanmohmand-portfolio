import { useTheme } from "@/contexts/ThemeContext";
import { trpc } from "@/lib/trpc";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch all CMS data
  const heroQuery = trpc.cms.getHero.useQuery();
  const aboutQuery = trpc.cms.getAbout.useQuery();
  const projectsQuery = trpc.cms.getProjects.useQuery();
  const experiencesQuery = trpc.cms.getExperiences.useQuery();
  const skillsQuery = trpc.cms.getSkills.useQuery();
  const certificationsQuery = trpc.cms.getCertifications.useQuery();
  const educationQuery = trpc.cms.getEducation.useQuery();
  const blogsQuery = trpc.cms.getBlogs.useQuery();
  const companiesQuery = trpc.cms.getCompanies.useQuery();
  const channelsQuery = trpc.cms.getChannels.useQuery();
  const referralsQuery = trpc.cms.getReferrals.useQuery();
  const socialLinksQuery = trpc.cms.getSocialLinks.useQuery();
  const hireOptionsQuery = trpc.cms.getHireOptions.useQuery();

  const isLoading =
    heroQuery.isLoading ||
    aboutQuery.isLoading ||
    projectsQuery.isLoading ||
    experiencesQuery.isLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⟳</div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const hero = heroQuery.data;
  const about = aboutQuery.data;
  const projects = projectsQuery.data || [];
  const experiences = experiencesQuery.data || [];
  const skills = skillsQuery.data || [];
  const certifications = certificationsQuery.data || [];
  const education = educationQuery.data || [];
  const blogs = blogsQuery.data || [];
  const companies = companiesQuery.data || [];
  const channels = channelsQuery.data || [];
  const referrals = referralsQuery.data || [];
  const socialLinks = socialLinksQuery.data || [];
  const hireOptions = hireOptionsQuery.data || [];

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  // Group channels by category
  const channelsByCategory: Record<string, typeof channels> = {};
  channels.forEach((channel) => {
    if (!channelsByCategory[channel.category]) {
      channelsByCategory[channel.category] = [];
    }
    channelsByCategory[channel.category].push(channel);
  });

  // Parse technologies if it's a JSON string
  const parseTechnologies = (tech: any) => {
    if (Array.isArray(tech)) return tech;
    if (typeof tech === "string") {
      try {
        return JSON.parse(tech);
      } catch {
        return [];
      }
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">MKM</div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
            <a href="#hire" className="hover:text-accent transition-colors">
              Hire
            </a>
            <a href="#connect" className="hover:text-accent transition-colors">
              Connect
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {hero && (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 opacity-50" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="animate-in fade-in duration-1000">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {hero.title}
              </h1>
              {hero.subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  {hero.subtitle}
                </p>
              )}
              {hero.description && (
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                  {hero.description}
                </p>
              )}
              <div className="flex gap-4 justify-center flex-wrap">
                {hero.ctaButton1Text && hero.ctaButton1Link && (
                  <a
                    href={hero.ctaButton1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                  >
                    {hero.ctaButton1Text}
                  </a>
                )}
                {hero.ctaButton2Text && hero.ctaButton2Link && (
                  <a
                    href={hero.ctaButton2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-border rounded-lg hover:bg-card transition-colors font-semibold"
                  >
                    {hero.ctaButton2Text}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {about.content}
            </p>
          </div>
        </section>
      )}

      {/* Hire Me Section */}
      {hireOptions.length > 0 && (
        <section id="hire" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Hire Me</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {hireOptions.map((option) => (
                <a
                  key={option.id}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <div className="text-3xl mb-4">{option.iconType || "💼"}</div>
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {option.title}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {option.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Professional Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-4 border-accent pl-6 pb-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-2xl font-semibold">{exp.title}</h3>
                      <p className="text-accent font-medium">{exp.company}</p>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground">
                      📍 {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-muted-foreground mt-2">
                      {exp.description}
                    </p>
                  )}
                  {exp.technologies &&
                    parseTechnologies(exp.technologies).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {parseTechnologies(exp.technologies).map((tech: any) => (
                          <span
                            key={tech}
                            className="text-xs bg-accent/20 text-accent px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Technical Skills & Tools</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-card border border-border px-3 py-1 rounded-full text-sm hover:border-accent transition-colors"
                      >
                        {skill.icon && <span className="mr-1">{skill.icon}</span>}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">📚 Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-background border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-accent">{edu.institution}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
                  )}
                  {edu.endDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Graduated: {new Date(edu.endDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">🏆 Certifications</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold">{cert.title}</h3>
                  <p className="text-accent text-sm">{cert.issuer}</p>
                  {cert.issueDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-colors group"
                >
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {project.description}
                      </p>
                    )}
                    {project.category && (
                      <span className="inline-block mt-4 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        {project.category}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {blogs.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">My Blogs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <a
                  key={blog.id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                    {blog.title}
                  </h3>
                  {blog.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {blog.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-4">
                    📖 Read on {blog.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Companies Section */}
      {companies.length > 0 && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Companies & Ventures</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {companies.map((company) => (
                <a
                  key={company.id}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors group text-center"
                >
                  {company.logoUrl && (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                  )}
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {company.name}
                  </h3>
                  {company.role && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {company.role}
                    </p>
                  )}
                  {company.description && (
                    <p className="text-xs text-muted-foreground mt-4">
                      {company.description}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp & Telegram Channels */}
      {Object.keys(channelsByCategory).length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">WhatsApp & Telegram Channels</h2>
            {Object.entries(channelsByCategory).map(([category, categoryChannels]) => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">{category}</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {categoryChannels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{channel.flagEmoji || "💬"}</span>
                        <div>
                          <h4 className="font-semibold group-hover:text-accent transition-colors">
                            {channel.title}
                          </h4>
                          {channel.description && (
                            <p className="text-xs text-muted-foreground">
                              {channel.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Referrals Section */}
      {referrals.length > 0 && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">Exclusive Referrals & Offers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {referrals.map((referral) => (
                <a
                  key={referral.id}
                  href={referral.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                    {referral.title}
                  </h3>
                  {referral.description && (
                    <p className="text-muted-foreground mt-2">
                      {referral.description}
                    </p>
                  )}
                  {referral.benefit && (
                    <p className="text-sm text-accent font-semibold mt-4">
                      💰 {referral.benefit}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Links Section */}
      {socialLinks.length > 0 && (
        <section id="connect" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Connect With Me</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-colors"
                  title={link.title}
                >
                  <span className="text-xl">{link.iconType || "🔗"}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border text-center text-muted-foreground">
        <p>© 2025 Majid Khan Mohmand. All rights reserved.</p>
      </footer>
    </div>
  );
}
