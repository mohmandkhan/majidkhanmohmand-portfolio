import { trpc } from "@/lib/trpc";
import {
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Briefcase,
  BookOpen,
  Award,
  Zap,
  Globe,
  MessageSquare,
  Gift,
  Share2,
  Building2,
  Users,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  User,
  Target,
  Sparkles,
  MessageCircle,
  Layers,
  Laptop,
  Lightbulb,
  Rocket,
  TrendingUp,
  DollarSign,
  Smartphone,
  Radio,
  Network,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import ContactForm from "@/components/ContactForm";

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
  const fiverrGigsQuery = trpc.cms.getFiverrGigs.useQuery();
  const fiverrReviewsQuery = trpc.cms.getFiverrReviews.useQuery();

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
  const fiverrGigs = fiverrGigsQuery.data || [];
  const fiverrReviews = fiverrReviewsQuery.data || [];

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
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-background">
          {/* Professional geometric background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top right accent shape */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            {/* Bottom left accent shape */}
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
            {/* Diagonal lines */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-accent to-transparent" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-accent to-transparent" />
            </div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="animate-in fade-in duration-1000 space-y-8">
              {/* Main title with accent underline */}
              <div>
                <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                  {hero.title}
                </h1>
                <div className="h-1 w-24 bg-accent mx-auto" />
              </div>
              
              {/* Subtitle */}
              {hero.subtitle && (
                <p className="text-2xl md:text-3xl font-semibold text-foreground/90 leading-tight">
                  {hero.subtitle}
                </p>
              )}
              
              {/* Description */}
              {hero.description && (
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {hero.description}
                </p>
              )}
              
              {/* CTA Buttons with modern styling */}
              <div className="flex gap-6 justify-center flex-wrap pt-8">
                {hero.ctaButton1Text && hero.ctaButton1Link && (
                  <a
                    href={hero.ctaButton1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {hero.ctaButton1Text}
                  </a>
                )}
                {hero.ctaButton2Text && hero.ctaButton2Link && (
                  <a
                    href={hero.ctaButton2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-all duration-300 font-bold text-lg"
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
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">About Me</h2>
            </div>
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
            <div className="flex items-center gap-3 mb-12">
              <Target className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Hire Me</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hireOptions.map((option) => (
                <a
                  key={option.id}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <div className="text-accent mb-4">
                    {option.title.toLowerCase().includes('whatsapp') && <MessageCircle className="w-8 h-8" />}
                    {option.title.toLowerCase().includes('fiverr') && <Briefcase className="w-8 h-8" />}
                    {option.title.toLowerCase().includes('upwork') && <Layers className="w-8 h-8" />}
                    {!option.title.toLowerCase().includes('whatsapp') && !option.title.toLowerCase().includes('fiverr') && !option.title.toLowerCase().includes('upwork') && <Briefcase className="w-8 h-8" />}
                  </div>
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
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Professional Experience</h2>
            </div>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-4 border-accent pl-6 pb-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <Laptop className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold">{exp.title}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground ml-9">
                      <MapPin className="w-4 h-4 inline mr-1" />{exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-muted-foreground mt-2 ml-9">
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
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Technical Skills & Tools</h2>
            </div>
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
            <div className="flex items-center gap-3 mb-12">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-background border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-accent">{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
                      )}
                      {edu.endDate && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Graduated: {new Date(edu.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
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
            <div className="flex items-center gap-3 mb-12">
              <Award className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Certifications</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-accent text-sm">{cert.issuer}</p>
                      {cert.issueDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
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
            <div className="flex items-center gap-3 mb-12">
              <Sparkles className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Featured Projects</h2>
            </div>
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
                    <div className="flex items-start gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>
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
            <div className="flex items-center gap-3 mb-12">
              <FileText className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">My Blogs</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <a
                  key={blog.id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Radio className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                  {blog.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {blog.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-4">
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    Read on {blog.title}
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
            <div className="flex items-center gap-3 mb-12">
              <Building2 className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Companies & Ventures</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {companies.map((company) => (
                <a
                  key={company.id}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-8 hover:border-accent transition-colors group text-center"
                >
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-accent" />
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
            <div className="flex items-center gap-3 mb-12">
              <MessageSquare className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">WhatsApp & Telegram Channels</h2>
            </div>
            {Object.entries(channelsByCategory).map(([category, categoryChannels]) => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-accent" />
                  {category}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {categoryChannels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
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
            <div className="flex items-center gap-3 mb-12">
              <Gift className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Exclusive Referrals & Offers</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {referrals.map((referral) => (
                <a
                  key={referral.id}
                  href={referral.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-colors group"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {referral.title}
                    </h3>
                  </div>
                  {referral.description && (
                    <p className="text-muted-foreground mt-2">
                      {referral.description}
                    </p>
                  )}
                  {referral.benefit && (
                    <p className="text-sm text-accent font-semibold mt-4">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      {referral.benefit}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Fiverr Gigs Section */}
      {fiverrGigs.length > 0 && (
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Fiverr Gigs</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fiverrGigs.map((gig) => (
                <a
                  key={gig.id}
                  href={gig.gigUrl || "https://www.fiverr.com/majidkhan_moh"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-all group hover:shadow-lg"
                >
                  {gig.imageUrl && (
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <img
                        src={gig.imageUrl}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {gig.title}
                    </h3>
                    {gig.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {gig.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      {gig.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-accent">★</span>
                          <span className="font-semibold">{gig.rating}</span>
                          {gig.reviewCount && (
                            <span className="text-xs text-muted-foreground">({gig.reviewCount})</span>
                          )}
                        </div>
                      )}
                    </div>
                    {(gig.priceFrom || gig.priceTo) && (
                      <div className="text-lg font-bold text-accent">
                        From {gig.currency} {gig.priceFrom || gig.priceTo}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fiverr Reviews Section */}
      {fiverrReviews.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <MessageSquare className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold">Client Reviews</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {fiverrReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.reviewerName}</h3>
                      {review.reviewerCountry && (
                        <p className="text-sm text-muted-foreground">{review.reviewerCountry}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < parseInt(review.rating || "5") ? "text-accent" : "text-muted"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{review.comment}"
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {review.gigTitle && (
                      <span className="bg-muted px-2 py-1 rounded">
                        {review.gigTitle}
                      </span>
                    )}
                    {review.priceRange && (
                      <span className="bg-muted px-2 py-1 rounded">
                        {review.priceRange}
                      </span>
                    )}
                    {review.duration && (
                      <span className="bg-muted px-2 py-1 rounded">
                        {review.duration}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Social Links Section */}
      {socialLinks.length > 0 && (
        <section id="connect" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Share2 className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-bold text-center">Connect With Me</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => {
                const getSocialIcon = (title: string | undefined) => {
                  if (!title) return <Globe className="w-5 h-5" />;
                  const lowerTitle = title.toLowerCase();
                  if (lowerTitle.includes('github')) return <Github className="w-5 h-5" />;
                  if (lowerTitle.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
                  if (lowerTitle.includes('twitter')) return <Twitter className="w-5 h-5" />;
                  if (lowerTitle.includes('mail') || lowerTitle.includes('email')) return <Mail className="w-5 h-5" />;
                  return <Globe className="w-5 h-5" />;
                };
                return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-colors text-accent"
                  title={link.title || 'Social Link'}
                >
                  {getSocialIcon(link.title)}
                </a>
              );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border text-center text-muted-foreground">
        <p>© 2025 Majid Khan Mohmand. All rights reserved.</p>
      </footer>
    </div>
  );
}
