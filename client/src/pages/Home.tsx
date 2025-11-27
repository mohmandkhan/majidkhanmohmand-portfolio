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
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  // Group channels by category
  const channelsByCategory: Record<string, typeof channels> = {};
  channels.forEach(channel => {
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
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">MKM</div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#projects"
              className="hover:text-yellow-400 transition-colors"
            >
              Projects
            </a>
            <a href="#hire" className="hover:text-yellow-400 transition-colors">
              Hire
            </a>
            <a
              href="#connect"
              className="hover:text-yellow-400 transition-colors"
            >
              Connect
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-yellow-400/10 rounded-lg transition-colors"
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
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-background hero-background">
          {/* Decorative accent shapes - tennet.io inspired */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top right yellow accent */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-float" />
            {/* Bottom left accent (Monochrome) */}
            <div
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
            {/* Small accent squares */}
            <div className="absolute top-20 right-20 w-6 h-6 border-2 border-yellow-400/30" />
            <div className="absolute bottom-32 left-20 w-4 h-4 bg-white/10" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full" />
          </div>

          <div className="relative z-10 w-full">
            {/* Main container with grid layout */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center px-4">
              {/* Left side - Text content */}
              <div className="space-y-8 animate-fade-in-up">
                {/* Badge */}
                <div className="inline-block">
                  <div className="px-4 py-2 border border-yellow-400/30 rounded-full text-sm font-semibold text-yellow-400 bg-yellow-400/5">
                    Welcome to my portfolio
                  </div>
                </div>

                {/* Main title */}
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    <span className="text-white">{hero.title}</span>
                  </h1>
                </div>

                {/* Subtitle */}
                {hero.subtitle && (
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                    {hero.subtitle}
                  </p>
                )}

                {/* Description */}
                {hero.description && (
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {hero.description}
                  </p>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-4 flex-wrap pt-4">
                  {hero.ctaButton1Text && hero.ctaButton1Link && (
                    <a
                      href={hero.ctaButton1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold text-base hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                    >
                      {hero.ctaButton1Text}
                      <span>→</span>
                    </a>
                  )}
                  {hero.ctaButton2Text && hero.ctaButton2Link && (
                    <a
                      href={hero.ctaButton2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 border-2 border-dashed border-yellow-400 text-yellow-400 rounded-full font-bold text-base hover:bg-yellow-400/10 transition-all duration-300 hover:scale-105"
                    >
                      {hero.ctaButton2Text}
                    </a>
                  )}
                </div>
              </div>

              {/* Right side - Profile image */}
              <div
                className="relative flex justify-center items-center animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {/* Image container - clean without effects */}
                <img
                  src="/majid-profile.png"
                  alt="Majid Khan Mohmand"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-3xl shadow-lg transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section className="py-20 px-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                About Me
              </h2>
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
              <Target className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Hire Me
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hireOptions.map(option => (
                <a
                  key={option.id}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-yellow-400 transition-colors group"
                >
                  <div className="text-yellow-400 mb-4">
                    {option.title.toLowerCase().includes("whatsapp") && (
                      <MessageCircle className="w-8 h-8" />
                    )}
                    {option.title.toLowerCase().includes("fiverr") && (
                      <Briefcase className="w-8 h-8" />
                    )}
                    {option.title.toLowerCase().includes("upwork") && (
                      <Layers className="w-8 h-8" />
                    )}
                    {!option.title.toLowerCase().includes("whatsapp") &&
                      !option.title.toLowerCase().includes("fiverr") &&
                      !option.title.toLowerCase().includes("upwork") && (
                        <Briefcase className="w-8 h-8" />
                      )}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
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
        <section className="py-20 px-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8">
              {experiences.map(exp => (
                <div
                  key={exp.id}
                  className="border-l-4 border-yellow-400 pl-6 pb-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <Laptop className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold">{exp.title}</h3>
                        <p className="text-yellow-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground ml-9">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {exp.location}
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
                        {parseTechnologies(exp.technologies).map(
                          (tech: any) => (
                            <span
                              key={String(tech)}
                              className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded"
                            >
                              {String(tech)}
                            </span>
                          )
                        )}
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
        <section className="py-20 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Technical Skills & Tools
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map(skill => (
                        <span
                          key={skill.id}
                          className="bg-card border border-border px-3 py-1 rounded-full text-sm hover:border-yellow-400 transition-colors"
                        >
                          {skill.icon && (
                            <span className="mr-1">{skill.icon}</span>
                          )}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="py-20 px-4 bg-card">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <BookOpen className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Education
              </h2>
            </div>
            <div className="space-y-6">
              {education.map(edu => (
                <div
                  key={edu.id}
                  className="bg-background border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-yellow-400">{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className="text-muted-foreground">
                          {edu.fieldOfStudy}
                        </p>
                      )}
                      {edu.endDate && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Graduated:{" "}
                          {new Date(edu.endDate).toLocaleDateString()}
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
        <section className="py-20 px-4 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Award className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Certifications
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map(cert => (
                <div
                  key={cert.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-yellow-400 text-sm">{cert.issuer}</p>
                      {cert.issueDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Issued:{" "}
                          {new Date(cert.issueDate).toLocaleDateString()}
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
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Featured Projects
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map(project => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-yellow-400 transition-colors group"
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
                      <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {project.description}
                      </p>
                    )}
                    {project.category && (
                      <span className="inline-block mt-4 text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">
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
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <FileText className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                My Blogs
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map(blog => (
                <a
                  key={blog.id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-6 hover:border-yellow-400 transition-colors group"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Radio className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">
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
        <section className="py-20 px-4 bg-card">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Building2 className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Companies & Ventures
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {companies.map(company => (
                <a
                  key={company.id}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-8 hover:border-yellow-400 transition-colors group text-center"
                >
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  )}
                  <h3 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
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
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <MessageSquare className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                WhatsApp & Telegram Channels
              </h2>
            </div>
            {Object.entries(channelsByCategory).map(
              ([category, categoryChannels]) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-yellow-400" />
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {categoryChannels.map(channel => (
                      <a
                        key={channel.id}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card border border-border rounded-lg p-4 hover:border-yellow-400 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <MessageCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold group-hover:text-yellow-400 transition-colors">
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
              )
            )}
          </div>
        </section>
      )}

      {/* Referrals Section */}
      {referrals.length > 0 && (
        <section className="py-20 px-4 bg-card">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Gift className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Exclusive Referrals & Offers
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {referrals.map(referral => (
                <a
                  key={referral.id}
                  href={referral.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg p-6 hover:border-yellow-400 transition-colors group"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">
                      {referral.title}
                    </h3>
                  </div>
                  {referral.description && (
                    <p className="text-muted-foreground mt-2">
                      {referral.description}
                    </p>
                  )}
                  {referral.benefit && (
                    <p className="text-sm text-yellow-400 font-semibold mt-4">
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
        <section className="py-20 px-4 bg-card">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Fiverr Gigs
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fiverrGigs.map(gig => (
                <a
                  key={gig.id}
                  href={gig.gigUrl || "https://www.fiverr.com/majidkhan_moh"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-yellow-400 transition-all group hover:shadow-lg"
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
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
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
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold">{gig.rating}</span>
                          {gig.reviewCount && (
                            <span className="text-xs text-muted-foreground">
                              ({gig.reviewCount})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {(gig.priceFrom || gig.priceTo) && (
                      <div className="text-lg font-bold text-yellow-400">
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
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <MessageSquare className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Client Reviews
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {fiverrReviews.map(review => (
                <div
                  key={review.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-yellow-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {review.reviewerName}
                      </h3>
                      {review.reviewerCountry && (
                        <p className="text-sm text-muted-foreground">
                          {review.reviewerCountry}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < parseInt(review.rating || "5")
                              ? "text-yellow-400"
                              : "text-muted"
                          }
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
              <Share2 className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold text-center">
                Connect With Me
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map(link => {
                const getSocialIcon = (platform: string | undefined) => {
                  if (!platform) return <Globe className="w-5 h-5" />;
                  const lowerPlatform = platform.toLowerCase();
                  if (lowerPlatform.includes("github"))
                    return <Github className="w-5 h-5" />;
                  if (lowerPlatform.includes("linkedin"))
                    return <Linkedin className="w-5 h-5" />;
                  if (lowerPlatform.includes("twitter"))
                    return <Twitter className="w-5 h-5" />;
                  if (
                    lowerPlatform.includes("mail") ||
                    lowerPlatform.includes("email")
                  )
                    return <Mail className="w-5 h-5" />;
                  return <Globe className="w-5 h-5" />;
                };
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full hover:border-yellow-400 hover:bg-yellow-400/10 transition-colors text-yellow-400"
                    title={link.platform || "Social Link"}
                  >
                    {getSocialIcon(link.platform)}
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
