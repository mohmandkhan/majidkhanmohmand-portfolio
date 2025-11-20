import { useAuth } from "@/_core/hooks/useAuth";
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
  Database,
  Cloud,
  Container,
  GitBranch,
  Terminal,
  Layers,
  MessageCircle,
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
    logo: "/logos/storeswiki-logo.png",
    period: "04-2024 - Present",
    description: "Leading full-stack development with modern web technologies and cloud infrastructure",
    technologies: ["JavaScript", "React", "Node.js", "AWS", "Docker", "MySQL"],
  },
  {
    title: "Senior Full Stack Web Developer",
    company: "Aller Media AB – Sweden – REMOTE",
    logo: "/logos/aller-media-logo.jpg",
    period: "04-2020 - 02-2025",
    description: "Developed and maintained multiple content management systems and web applications",
    technologies: ["React", "Node.js", "AWS", "Docker", "MySQL", "SCSS"],
  },
  {
    title: "AWS Cloud Developer",
    company: "Nordic Software Technologies FZE – UAE – CONTRACT",
    logo: null,
    period: "01-2024 - 03-2024",
    description: "Designed and implemented cloud infrastructure with EC2, ALBs, and auto-scaling",
    technologies: ["AWS", "EC2", "CloudFormation", "CI/CD", "NodeJS"],
  },
  {
    title: "Tech-Lead and MERN Stack Developer",
    company: "QURB L.L.C F-Z – UAE – CONTRACT",
    logo: "/logos/qurb-logo.jpg",
    period: "11-2022 - 01-2024",
    description: "Led team of 5 developers, managed cloud infrastructure and MERN stack development",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Azure", "Docker"],
  },
  {
    title: "Full Stack Web Developer",
    company: "ACSAB – CONTRACT – REMOTE",
    logo: null,
    period: "07-2022 - 09-2022",
    description: "Developed e-learning platform with payment gateway integration",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  },
  {
    title: "Full Stack Web Developer / CEO",
    company: "Code Engineers – PAKISTAN",
    logo: "/logos/code-engineers-logo.png",
    period: "2013 - 2019",
    description: "Founded and managed software development company, built multiple enterprise solutions",
    technologies: ["JavaScript", "PHP", "C#", "Azure", "SQL Server"],
  },
];

const skills = {
  "Languages & Frameworks": [
    { name: "React JS", icon: "⚛️" },
    { name: "Next JS", icon: "▲" },
    { name: "HTML5", icon: "🔷" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "jQuery", icon: "📦" },
    { name: "PHP", icon: "🐘" },
    { name: "C#", icon: "🔶" },
    { name: "NodeJS", icon: "🟢" },
  ],
  "UI/UX": [
    { name: "Bootstrap", icon: "📐" },
    { name: "Tailwind CSS", icon: "🎯" },
    { name: "Ant Design", icon: "🐜" },
    { name: "Webpack", icon: "📦" },
    { name: "Gulp", icon: "🌊" },
  ],
  "Backend Technologies": [
    { name: "PHP/MySQL", icon: "🗄️" },
    { name: "C#/SQL Server", icon: "🔷" },
    { name: "Node.js/MongoDB", icon: "🍃" },
    { name: "Oracle 10g/11g", icon: "🗄️" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", icon: "☁️" },
    { name: "Azure", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "Jenkins", icon: "🔧" },
    { name: "GitLab", icon: "🔀" },
    { name: "Ansible", icon: "⚙️" },
  ],
  "Desktop & CLI": [
    { name: "Windows Forms", icon: "🪟" },
    { name: "Java", icon: "☕" },
    { name: "Bash Scripting", icon: "💻" },
  ],
  "CMS/ERP": [
    { name: "WordPress", icon: "📝" },
    { name: "Odoo", icon: "📊" },
  ],
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
    logo: "/logos/storeswiki-logo.png",
    icon: Briefcase,
  },
  {
    title: "Company - Code Engineers",
    url: "https://codeengineers.net/",
    logo: "/logos/code-engineers-logo.png",
    icon: Code2,
  },
];

const hireLinks = [
  {
    title: "Hire Me - WhatsApp",
    url: "https://wa.me/393508274261",
    logo: null,
    icon: Mail,
  },
  {
    title: "Fiverr - Hire Me",
    url: "https://www.fiverr.com/majidkhan_moh",
    logo: "/logos/fiverr-logo.png",
    icon: Award,
  },
  {
    title: "Upwork",
    url: "https://www.upwork.com/freelancers/~01656cd2c7681104f0",
    logo: "/logos/upwork-logo.png",
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
    logo: null,
    icon: Zap,
  },
  {
    title: "Hostinger 50% Off",
    url: "https://hostinger.com/?REFERRALCODE=QLFMOHMANZY7",
    logo: null,
    icon: Globe,
  },
  {
    title: "$200 CLAUDE API Credits",
    url: "https://agentrouter.org/register?aff=f4s7",
    logo: null,
    icon: Code2,
  },
  {
    title: "n8n Promo",
    url: "https://n8n.partnerlinks.io/z2s50mlq8na1",
    logo: null,
    icon: Zap,
  },
  {
    title: "Manus AI Credits",
    url: "https://manus.im/invitation/VKFEHQEDAS7M",
    logo: null,
    icon: Zap,
  },
];

const whatsappChannels = {
  "Business & Entrepreneurship": [
    {
      title: "Market Maverick (MKM)",
      url: "https://whatsapp.com/channel/0029VayosDMLNSa9rgibaX0H",
      flag: "🇺🇸",
      category: "Business",
    },
    {
      title: "Millionaires Mindset",
      url: "https://whatsapp.com/channel/0029VaosSLIFSAtCtIXmbC0E",
      flag: "🇺🇸",
      category: "Mindset",
    },
    {
      title: "Storeswiki LLC",
      url: "https://whatsapp.com/channel/0029Vaytxl759PwQEA7MEk3z",
      flag: "🇺🇸",
      category: "Business",
    },
    {
      title: "MKM Enterprise: Hosting, RDP, VPS, VPN, Digital Products",
      url: "https://whatsapp.com/channel/0029VayzX3HDeON89j5UZ10Z",
      flag: "🇵🇰",
      category: "Services",
    },
  ],
  "Pakistan-Based Channels": [
    {
      title: "Batman Pakistan",
      url: "https://whatsapp.com/channel/0029VatthhYBqbr4Sx3Erf1L",
      flag: "🇵🇰",
      category: "Community",
    },
    {
      title: "MonsterTools",
      url: "https://whatsapp.com/channel/0029VayIHbs7oQhUO9IsHM00",
      flag: "🇵🇰",
      category: "Tools",
    },
    {
      title: "Secret Pakistan",
      url: "https://whatsapp.com/channel/0029Vauzcbo90x2zsSZUyK1M",
      flag: "🇵🇰",
      category: "Exclusive",
    },
    {
      title: "DALLHAMAI Pakistan",
      url: "https://whatsapp.com/channel/0029VauFrN7DJ6HAJwAla73z",
      flag: "🇵🇰",
      category: "AI",
    },
    {
      title: "MKM Exclusive Dunya",
      url: "https://t.me/+IbUgFAYlWVE5NDk0",
      flag: "🇵🇰",
      category: "Telegram",
    },
    {
      title: "MKM Batman.pk",
      url: "https://t.me/+XacbHcUTT6c1ZTFk",
      flag: "🇵🇰",
      category: "Telegram",
    },
  ],
  "Technology & Tools": [
    {
      title: "TechABC WhatsApp API",
      url: "https://whatsapp.com/channel/0029Vatxc4KL2ATy0f8QGB1E",
      flag: "💻",
      category: "Tech",
    },
    {
      title: "ClickGrow: SocialMedia Automation",
      url: "https://whatsapp.com/channel/0029VayD0iQGE56cPNzrY90r",
      flag: "🤖",
      category: "Automation",
    },
    {
      title: "MEGA COURSE Channel",
      url: "https://whatsapp.com/channel/0029VauBiyv3bbV4mnJ7d63S",
      flag: "📚",
      category: "Education",
    },
  ],
  "Interest Groups": [
    {
      title: "Game Lovers",
      url: "https://whatsapp.com/channel/0029VazdNxrLikg13bzZiO3n",
      flag: "🎮",
      category: "Gaming",
    },
    {
      title: "Technology Lovers",
      url: "https://whatsapp.com/channel/0029VazQM1jJENy3drf3s83D",
      flag: "🔬",
      category: "Tech",
    },
    {
      title: "Cricket Lovers",
      url: "https://whatsapp.com/channel/0029VazTgFYBA1f0SOpg1y0N",
      flag: "🏏",
      category: "Sports",
    },
    {
      title: "News Lovers",
      url: "https://whatsapp.com/channel/0029Vav6NJ72phHQtxGIIw0n",
      flag: "📰",
      category: "News",
    },
  ],
  "Telegram Channels": [
    {
      title: "MKM HYPE",
      url: "https://t.me/MKMEnterprise",
      flag: "📱",
      category: "Telegram",
    },
  ],
};

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-lg hover:scale-105"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-400" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
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
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
      title={social.title}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function SimpleCard({ item }: { item: { title: string; url: string; logo?: string | null; icon: any } }) {
  const Icon = item.icon;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {item.logo ? (
        <img src={item.logo} alt={item.title} className="w-5 h-5 object-contain" />
      ) : (
        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
      )}
      <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
        {item.title}
      </span>
      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors ml-auto" />
    </a>
  );
}

function CompanyCard({ company }: { company: (typeof companies)[0] }) {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {company.logo ? (
        <img src={company.logo} alt={company.title} className="w-16 h-16 object-contain" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <company.icon className="w-8 h-8 text-gray-700 dark:text-gray-400" />
        </div>
      )}
      <span className="font-medium text-center text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors text-sm">
        {company.title.replace("Company - ", "")}
      </span>
      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
    </a>
  );
}

function WhatsAppChannelCard({ channel }: { channel: any }) {
  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <span className="text-xl">{channel.flag}</span>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors block truncate">
          {channel.title}
        </span>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
    </a>
  );
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-300 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm transition-colors duration-300">
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
        {/* Hero Section - Simplified Black & White */}
        <section className="mb-20 relative py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            {/* Title */}
            <div className="mb-6 animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                Majid Khan Mohmand
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-8 animate-fade-in-up delay-200">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Full Stack Developer • AI Enthusiast • Content Creator • Entrepreneur
              </p>
            </div>

            {/* Description */}
            <div className="mb-12 animate-fade-in-up delay-300">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Programming, Travel, Games, Fun, Learning, Entertainment, and Experiences
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
              <a
                href="#projects"
                className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#hire"
                className="px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                Hire Me
              </a>
            </div>

            {/* Floating Icons - Minimal */}
            <div className="mt-16 flex justify-center gap-8 flex-wrap animate-fade-in-up delay-500">
              <div className="floating-element text-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                  <Code2 className="w-8 h-8 text-gray-900 dark:text-gray-100" />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Development</p>
              </div>
              <div className="floating-element text-center" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                  <Cloud className="w-8 h-8 text-gray-900 dark:text-gray-100" />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cloud & AI</p>
              </div>
              <div className="floating-element text-center" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Innovation</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sm:p-8">
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
            <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sm:p-8">
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
            <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sm:p-8">
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
            <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sm:p-8">
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
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 sm:p-8">
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {exp.logo ? (
                      <img src={exp.logo} alt={exp.company} className="w-12 h-12 object-contain flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-gray-700 dark:text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
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
              <div key={category} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                      <span>{skill.icon}</span>
                      {skill.name}
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
              <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-gray-700 dark:text-gray-400 flex-shrink-0 mt-1" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.url} company={company} />
            ))}
          </div>
        </section>

        {/* WhatsApp Channels Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <MessageCircle className="w-8 h-8" />
            WhatsApp & Telegram Channels
          </h2>
          <div className="space-y-8">
            {Object.entries(whatsappChannels).map(([categoryName, channels]) => (
              <div key={categoryName}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{categoryName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {channels.map((channel) => (
                    <WhatsAppChannelCard key={channel.url} channel={channel} />
                  ))}
                </div>
              </div>
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
      <footer className="border-t border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-20 transition-colors duration-300">
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
