import { Button } from "@/components/ui/button";
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
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:scale-105"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-gray-700" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
            {project.title}
          </h3>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" />
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
      className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
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
      className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-300 hover:border-gray-400 hover:shadow-md hover:bg-gray-50"
    >
      <Icon className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
      <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
        {item.title}
      </span>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors ml-auto" />
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">MKM</div>
          <div className="flex gap-2">
            <a
              href="#projects"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Projects
            </a>
            <a
              href="#hire"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Hire
            </a>
            <a
              href="#social"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Connect
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
              Majid Khan Mohmand
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Full Stack Developer • AI Enthusiast • Content Creator • Entrepreneur
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Programming, Travel, Games, Fun, Learning, Entertainment, and Experiences
            </p>
          </div>
        </section>

        {/* Hire Me Section */}
        <section id="hire" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Hire Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hireLinks.map((link) => (
              <SimpleCard key={link.url} item={link} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">My Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <SimpleCard key={blog.url} item={blog} />
            ))}
          </div>
        </section>

        {/* Companies Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Companies & Ventures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companies.map((company) => (
              <SimpleCard key={company.url} item={company} />
            ))}
          </div>
        </section>

        {/* Referrals Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Exclusive Referrals & Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {referrals.map((referral) => (
              <SimpleCard key={referral.url} item={referral} />
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section id="social" className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Connect With Me</h2>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {socialLinks.map((social) => (
              <SocialLink key={social.url} social={social} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-600">
          <p className="mb-4">
            © 2024 Majid Khan Mohmand. All rights reserved.
          </p>
          <p className="text-sm">
            <a href="https://linktr.ee/majidkhanmohmand" className="text-gray-700 hover:text-gray-900 font-medium">
              View on Linktree
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
