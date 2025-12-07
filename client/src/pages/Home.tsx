// import { trpc } from "@/lib/trpc";
import { portfolioData } from "@/data/portfolioData";
import {
  Code2,
  Briefcase,
  BookOpen,
  Award,
  Gift,
  Building2,
  FileText,
  ExternalLink,
  MessageSquare,
  Smartphone,
  MessageCircle,
  Layers,
  Laptop,
  TrendingUp,
  DollarSign,
  User,
  Target,
} from "lucide-react";
import TemplateBackground from "@/components/layout/TemplateBackground";
import TemplateNavbar from "@/components/layout/TemplateNavbar";
import TemplateHero from "@/components/home/TemplateHero";
import TemplateProjects from "@/components/home/TemplateProjects";
import TemplateServices from "@/components/home/TemplateServices";
import TemplateTestimonials from "@/components/home/TemplateTestimonials";
import TemplatePricing from "@/components/home/TemplatePricing";
import TemplateContact from "@/components/home/TemplateContact";
import TemplateFooter from "@/components/layout/TemplateFooter";
import BackToTop from "@/components/layout/BackToTop";

export default function Home() {
  // Use local data for reliability
  const hero = portfolioData.hero;
  const about = portfolioData.about;
  const projects = portfolioData.projects;
  const experiences = portfolioData.experiences;
  const skills = portfolioData.skills;
  const education = portfolioData.education;
  const socialLinks = portfolioData.socialLinks;
  const hireOptions = portfolioData.hireOptions;
  const certifications = portfolioData.certifications;
  const blogs = portfolioData.blogs;
  const companies = portfolioData.companies;
  const channels = portfolioData.channels;
  const referrals = portfolioData.referrals;

  // Empty arrays for now as they are dynamically fetched usually
  const fiverrGigs: any[] = [];
  const fiverrReviews: any[] = [];

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
    <div className="wrapper text-white font-sans">
      <TemplateBackground />
      <TemplateNavbar />

      {/* Template Sections */}
      <TemplateHero data={hero || {}} />
      <TemplateProjects projects={projects} />
      <TemplateServices />

      {/* Existing Content Integrated into Template Layout */}

      {/* About Section */}
      {about && (
        <section className="py-20 px-4 relative z-10" id="about">
          <div className="max-w-4xl mx-auto bg-zinc-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-sm animate-fade-slide-in">
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                About Me
              </h2>
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed font-sans">
              {about.content}
            </p>
          </div>
        </section>
      )}

      {/* Hire Me Section */}
      {hireOptions.length > 0 && (
        <section id="hire" className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Target className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
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
                  className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors group backdrop-blur-sm"
                >
                  <div className="text-white mb-4">
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
                  <h3 className="text-xl font-semibold text-white group-hover:text-zinc-200 transition-colors font-manrope">
                    {option.title}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-zinc-400 mt-2 font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8">
              {experiences.map(exp => (
                <div
                  key={exp.id}
                  className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <Laptop className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold font-manrope">
                          {exp.title}
                        </h3>
                        <p className="text-zinc-300 font-medium font-sans">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-zinc-500 ml-9 font-sans">
                      {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-zinc-400 mt-2 ml-9 font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  {exp.technologies &&
                    parseTechnologies(exp.technologies).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 ml-9">
                        {(parseTechnologies(exp.technologies) as string[]).map(
                          tech => (
                            <span
                              key={String(tech)}
                              className="text-xs bg-white/10 text-zinc-200 border border-white/10 px-2 py-1 rounded-full font-sans"
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                Technical Skills & Tools
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div
                    key={category}
                    className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-semibold mb-4 font-manrope text-zinc-200">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map(skill => (
                        <span
                          key={skill.id}
                          className="bg-zinc-900/60 border border-white/10 px-3 py-1 rounded-full text-sm hover:bg-white/10 transition-colors font-sans text-zinc-300"
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <BookOpen className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                Education
              </h2>
            </div>
            <div className="space-y-6">
              {education.map(edu => (
                <div
                  key={edu.id}
                  className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold font-manrope">
                        {edu.degree}
                      </h3>
                      <p className="text-zinc-300 font-sans">
                        {edu.institution}
                      </p>
                      {edu.fieldOfStudy && (
                        <p className="text-zinc-400 font-sans">
                          {edu.fieldOfStudy}
                        </p>
                      )}
                      {edu.endDate && (
                        <p className="text-sm text-zinc-500 mt-2 font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Award className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                Certifications
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map(cert => (
                <div
                  key={cert.id}
                  className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-manrope">
                        {cert.title}
                      </h3>
                      <p className="text-zinc-300 text-sm font-sans">
                        {cert.issuer}
                      </p>
                      {cert.issueDate && (
                        <p className="text-xs text-zinc-500 mt-2 font-sans">
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

      {/* Blogs Section */}
      {blogs.length > 0 && (
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <FileText className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
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
                  className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors group backdrop-blur-sm"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-white transition-colors font-manrope text-zinc-200">
                      {blog.title}
                    </h3>
                  </div>
                  {blog.description && (
                    <p className="text-sm text-zinc-400 mt-2 font-sans">
                      {blog.description}
                    </p>
                  )}
                  <p className="text-xs text-zinc-500 mt-4 flex items-center font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Building2 className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
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
                  className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/60 transition-colors group text-center backdrop-blur-sm"
                >
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-24 h-24 mx-auto mb-4 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-zinc-500 group-hover:text-white transition-colors" />
                  )}
                  <h3 className="text-xl font-semibold group-hover:text-white transition-colors font-manrope text-zinc-200">
                    {company.name}
                  </h3>
                  {company.role && (
                    <p className="text-sm text-zinc-400 mt-2 font-sans">
                      {company.role}
                    </p>
                  )}
                  {company.description && (
                    <p className="text-xs text-zinc-500 mt-4 font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <MessageSquare className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
                WhatsApp & Telegram Channels
              </h2>
            </div>
            {Object.entries(channelsByCategory).map(
              ([category, categoryChannels]) => (
                <div key={category} className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 font-manrope text-zinc-200">
                    <Smartphone className="w-6 h-6 text-zinc-400" />
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {categoryChannels.map(channel => (
                      <a
                        key={channel.id}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900/40 border border-white/10 rounded-2xl p-4 hover:bg-zinc-900/60 transition-colors group backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-3">
                          <MessageCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0 group-hover:text-white" />
                          <div className="flex-1">
                            <h4 className="font-semibold group-hover:text-white transition-colors font-sans text-zinc-300">
                              {channel.title}
                            </h4>
                            {channel.description && (
                              <p className="text-xs text-zinc-500 font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Gift className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
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
                  className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors group backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-zinc-400 mt-0.5 flex-shrink-0 group-hover:text-white" />
                    <h3 className="text-lg font-semibold group-hover:text-white transition-colors font-manrope text-zinc-200">
                      {referral.title}
                    </h3>
                  </div>
                  {referral.description && (
                    <p className="text-zinc-400 mt-2 font-sans">
                      {referral.description}
                    </p>
                  )}
                  {referral.benefit && (
                    <p className="text-sm text-zinc-300 font-semibold mt-4 flex items-center font-sans">
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
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-8 h-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-manrope">
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
                  className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all group hover:shadow-lg backdrop-blur-sm"
                >
                  {gig.imageUrl && (
                    <div className="relative h-48 overflow-hidden bg-zinc-800">
                      <img
                        src={gig.imageUrl}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors line-clamp-2 font-manrope text-zinc-200">
                      {gig.title}
                    </h3>
                    {gig.description && (
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2 font-sans">
                        {gig.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      {gig.rating && (
                        <div className="flex items-center gap-1 font-sans text-sm">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold text-white">
                            {gig.rating}
                          </span>
                          {gig.reviewCount && (
                            <span className="text-zinc-500">
                              ({gig.reviewCount})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {(gig.priceFrom || gig.priceTo) && (
                      <div className="text-lg font-bold text-white font-manrope">
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
      <TemplateTestimonials reviews={fiverrReviews} />

      {/* Pricing Section */}
      <TemplatePricing />

      {/* Contact Section */}
      <TemplateContact socialLinks={socialLinks} />

      <TemplateFooter />
      <BackToTop />
    </div>
  );
}
