import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Mail,
  Code2,
  Briefcase,
  BookOpen,
  Zap,
  Globe,
  Users,
  Megaphone,
  Award,
  Moon,
  Sun,
  Cpu,
  Award as AwardIcon,
  CheckCircle,
} from "lucide-react";

const projects = [
  {
    title: "Personal - Portfolio",
    url: "https://majidkhanmohmand.com/",
    category: "Personal",
    icon: Globe,
  },
  {
    title: "Project - QURB Services",
    url: "https://app.qurbservices.com/",
    category: "Project",
    icon: Briefcase,
  },
  {
    title: "Project - Academy",
    url: "https://academy.avrygroup.com/",
    category: "Project",
    icon: BookOpen,
  },
  {
    title: "Project - MKM Host",
    url: "https://mkmhost.com/",
    category: "Project",
    icon: Code2,
  },
  {
    title: "Project - WhatsApp API",
    url: "https://whatsapp.thetechabc.com/",
    category: "Project",
    icon: Zap,
  },
  {
    title: "Project - Digital Marketplace",
    url: "https://mkmmarket.com/",
    category: "Project",
    icon: Globe,
  },
  {
    title: "Project - Dallham AI",
    url: "https://dallham.com/",
    category: "Project",
    icon: Code2,
  },
  {
    title: "Project - My Daily Tools",
    url: "https://mydailytools.com/",
    category: "Project",
    icon: Zap,
  },
  {
    title: "PearlTrips",
    url: "https://pearltrips.com/",
    category: "Project",
    icon: Globe,
  },
];

const experiences = [
  {
    title: "Senior Full Stack Web Developer",
    company: "STORESWIKI – USA – REMOTE",
    period: "04-2024 - Present",
    description: "Leading full-stack development with modern web technologies and cloud infrastructure",
    technologies: ["JavaScript", "React", "Node.js", "AWS", "Docker", "MySQL"],
  },
  {
    title: "Senior Full Stack Web Developer",
    company: "Aller Media AB – Sweden – REMOTE",
    period: "04-2020 - 02-2025",
    description: "Developed and maintained multiple content management systems and web applications",
    technologies: ["React", "Node.js", "AWS", "Docker", "MySQL", "SCSS"],
  },
  {
    title: "AWS Cloud Developer",
    company: "Nordic Software Technologies FZE – UAE – CONTRACT",
    period: "01-2024 - 03-2024",
    description: "Designed and implemented cloud infrastructure with EC2, ALBs, and auto-scaling",
    technologies: ["AWS", "EC2", "CloudFormation", "CI/CD", "NodeJS"],
  },
  {
    title: "Tech-Lead and MERN Stack Developer",
    company: "QURB L.L.C F-Z – UAE – CONTRACT",
    period: "11-2022 - 01-2024",
    description: "Led team of 5 developers, managed cloud infrastructure and MERN stack development",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Azure", "Docker"],
  },
  {
    title: "Full Stack Web Developer",
    company: "ACSAB – CONTRACT – REMOTE",
    period: "07-2022 - 09-2022",
    description: "Developed e-learning platform with payment gateway integration",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  },
  {
    title: "Full Stack Web Developer / CEO",
    company: "Code Engineers – PAKISTAN",
    period: "2013 - 2019",
    description: "Founded and managed software development company, built multiple enterprise solutions",
    technologies: ["JavaScript", "PHP", "C#", "Azure", "SQL Server"],
  },
];

const skills = {
  "Languages & Frameworks": ["React JS", "Next JS", "HTML5", "CSS3", "JavaScript", "jQuery", "Ajax", "PHP", "C#", "ASP.NET", "NodeJS"],
  "UI/UX": ["Bootstrap", "React strap", "Ant Design", "Webpack", "Gulp"],
  "Backend Technologies": ["PHP/MySQL", "C#/SQL Server", "NodeJS/MongoDB", "Oracle 10g/11g/APEX"],
  "Cloud & DevOps": ["AWS", "Azure", "Docker", "Jenkins", "GitLab", "Ansible", "Nagios", "Red Hat Linux"],
  "Desktop & CLI": ["Windows Forms", "Java", "Bash Scripting"],
  "CMS/ERP": ["WordPress", "Odoo"],
  "SDLC Methodologies": ["Agile", "Scrum", "Kanban", "Extreme Programming (XP)"],
};

const certifications = [
  {
    title: "Microsoft Solution Framework Certification",
    issuer: "Microsoft",
  },
  {
    title: "Business Partner Integrità Training",
    issuer: "IBM",
  },
  {
    title: "ETL Data Extraction Certification",
    issuer: "Databricks",
  },
  {
    title: "Unified Data Analytics Certification",
    issuer: "Databricks",
  },
];

const blogs = [
  {
    title: "Blog - The Tech ABC",
    url: "https://thetechabc.com/",
    icon: BookOpen,
  },
  {
    title: "Blog - True or Game",
    url: "https://trueorgame.com/",
    icon: BookOpen,
  },
  {
    title: "Blog - InQ Daily",
    url: "https://inqdaily.com/",
    icon: BookOpen,
  },
  {
    title: "Blog - Medium",
    url: "https://medium.com/@majidkhanmohmand",
    icon: BookOpen,
  },
];

const companies = [
  {
    title: "Company - StoresWiki LLC",
    url: "https://www.storeswikillc.com/",
    icon: Briefcase,
  },
  {
    title: "Company - Code Engineers",
    url: "https://codeengineers.net/",
    icon: Code2,
  },
];

const hireLinks = [
  {
    title: "Hire Me - WhatsApp",
    url: "https://wa.me/393508274261",
    icon: Mail,
  },
  {
    title: "Fiverr - Hire Me",
    url: "https://www.fiverr.com/majidkhan_moh",
    icon: Award,
  },
  {
    title: "Upwork",
    url: "https://www.upwork.com/freelancers/~01656cd2c7681104f0",
    icon: Briefcase,
  },
];

const socialLinks = [
  { title: "Instagram", url: "https://www.instagram.com/majidkhanmohmand/", icon: Instagram },
  { title: "Facebook", url: "https://www.facebook.com/millionairemindsetbymkm", icon: Facebook },
  { title: "YouTube", url: "https://www.youtube.com/@majidmohmand?sub_confirmation=1", icon: Youtube },
  { title: "Twitter", url: "https://twitter.com/majidkhanmohman", icon: Twitter },
  { title: "TikTok", url: "https://www.tiktok.com/@majidkhanusa1", icon: Music },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/majidkhanmohmand", icon: Linkedin },
  { title: "GitHub", url: "https://github.com/mohmandkhan", icon: Github },
];

const referrals = [
  {
    title: "$50 Free - MegaLLM",
    url: "https://megallm.io/ref/REF-VP1P0URC",
    icon: Zap,
  },
  {
    title: "Hostinger 50% Off",
    url: "https://hostinger.com/?REFERRALCODE=QLFMOHMANZY7",
    icon: Globe,
  },
  {
    title: "$200 CLAUDE API Credits",
    url: "https://agentrouter.org/register?aff=f4s7",
    icon: Code2,
  },
  {
    title: "n8n Promo",
    url: "https://n8n.partnerlinks.io/z2s50mlq8na1",
    icon: Zap,
  },
  {
    title: "Manus AI Credits",
    url: "https://manus.im/invitation/VKFEHQEDAS7M",
    icon: Zap,
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-lg hover:scale-105"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {project.title}
          </h3>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
      </div>
    </a>
  );
}

function SocialLink({ social }: { social: (typeof socialLinks)[0] }) {
  const Icon = social.icon;
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
      title={social.title}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function SimpleCard({ item }: { item: { title: string; url: string; icon: any } }) {
  const Icon = item.icon;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
        {item.title}
      </span>
      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors ml-auto" />
    </a>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">MKM</div>
          <div className="flex gap-2 items-center">
            <a
              href="#projects"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#hire"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Hire
            </a>
            <a
              href="#social"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Connect
            </a>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              Majid Khan Mohmand
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Full Stack Developer • AI Enthusiast • Content Creator • Entrepreneur
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Programming, Travel, Games, Fun, Learning, Entertainment, and Experiences
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              I am a passionate Full Stack Web Developer and Cloud Architect with extensive experience in building scalable applications. Currently pursuing a Master's degree in Data Science and Business Informatics from Università di Pisa, I combine technical expertise with business acumen to deliver innovative solutions.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My expertise spans across modern web technologies, cloud infrastructure, AI automation, and data-driven development. I am dedicated to creating impactful digital experiences and helping businesses leverage technology for growth.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-gray-700 dark:text-gray-400 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Master's Degree in Data Science and Business Informatics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Università di Pisa, Italy
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    Starting September 2025 • Specializing in Data Science and Business Intelligence
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-gray-700 dark:text-gray-400 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Masters in Software Engineering
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    University of Peshawar, Pakistan
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    2012 - 2015 • GPA: 4.0/4.0
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-gray-700 dark:text-gray-400 mt-1" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Bachelor in Computer Science
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    University of Peshawar, Pakistan
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    2008 - 2011 • 4 Years (Honour) • GPA: 3.0/4.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Professional Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">{exp.period}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Technical Skills & Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{cert.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hire Me Section */}
        <section id="hire" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Hire Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hireLinks.map((link) => (
              <SimpleCard key={link.url} item={link} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">My Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <SimpleCard key={blog.url} item={blog} />
            ))}
          </div>
        </section>

        {/* Companies Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Companies & Ventures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companies.map((company) => (
              <SimpleCard key={company.url} item={company} />
            ))}
          </div>
        </section>

        {/* Referrals Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Exclusive Referrals & Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {referrals.map((referral) => (
              <SimpleCard key={referral.url} item={referral} />
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section id="social" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Connect With Me</h2>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {socialLinks.map((social) => (
              <SocialLink key={social.url} social={social} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-4">
            © 2024 Majid Khan Mohmand. All rights reserved.
          </p>
          <p className="text-sm">
            <a href="https://linktr.ee/majidkhanmohmand" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
              View on Linktree
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
