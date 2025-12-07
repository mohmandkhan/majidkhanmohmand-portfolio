import {
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

interface ContactProps {
  socialLinks: SocialLink[];
}

const FIXED_SOCIAL_LINKS = [
  {
    id: 1,
    platform: "GitHub",
    url: "https://github.com/mohmandkhan",
  },
  {
    id: 2,
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/majidkhanmohmand",
  },
  {
    id: 3,
    platform: "Twitter",
    url: "https://twitter.com/majidkhanmohman",
  },
  {
    id: 4,
    platform: "Instagram",
    url: "https://instagram.com/majidkhanmohmand",
  },
  {
    id: 5,
    platform: "Facebook",
    url: "https://facebook.com/majidkhanmohmand007",
  },
  {
    id: 6,
    platform: "YouTube",
    url: "https://youtube.com/@majidmohmand",
  },
  {
    id: 7,
    platform: "Upwork",
    url: "https://www.upwork.com/freelancers/~01656cd2c7681104f0",
  },
  {
    id: 8,
    platform: "Fiverr",
    url: "https://www.fiverr.com/majidkhan_moh",
  },
  {
    id: 9,
    platform: "WhatsApp",
    url: "https://wa.me/393508274261",
  },
];

export default function TemplateContact({ socialLinks }: ContactProps) {
  // Use fixed links to ensure accuracy matching Linktree
  const displayLinks = FIXED_SOCIAL_LINKS;

  return (
    <div
      className="animate-fade-slide-in md:pt-40 md:pl-10 md:pr-10 md:pb-40 max-w-7xl mr-auto ml-auto pt-40 pr-10 pb-40 pl-10 relative"
      id="contact"
    >
      <div className="flex items-center justify-center gap-4 text-zinc-400 text-sm">
        <span className="h-px w-12 bg-white/10"></span>
        <span className="font-sans">Let's create together</span>
        <span className="h-px w-12 bg-white/10"></span>
      </div>

      <h2 className="mt-4 text-5xl sm:text-6xl text-white text-center tracking-tighter font-manrope font-medium">
        Ready to Start Your{" "}
        <span className="tracking-tighter font-manrope font-medium text-zinc-400">
          Project?
        </span>
      </h2>

      <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto text-center font-sans">
        Let's discuss your vision and create something extraordinary together.
        Get in touch today.
      </p>

      {/* Existing Contact Form Integration */}
      <div className="mt-12 max-w-2xl mx-auto bg-zinc-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
        <ContactForm />
      </div>

      <div className="flex flex-wrap gap-6 text-zinc-400 mt-12 gap-x-6 gap-y-6 items-center justify-center">
        {displayLinks.map((link, index) => {
          const getIcon = (platform: string) => {
            const p = platform.toLowerCase();
            if (p.includes("github")) return <Github className="w-5 h-5" />;
            if (p.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
            if (p.includes("twitter")) return <Twitter className="w-5 h-5" />;
            if (p.includes("facebook")) return <Facebook className="w-5 h-5" />;
            if (p.includes("instagram"))
              return <Instagram className="w-5 h-5" />;
            if (p.includes("youtube")) return <Youtube className="w-5 h-5" />;
            if (p.includes("whatsapp"))
              return <MessageCircle className="w-5 h-5" />;
            return <Globe className="w-5 h-5" />;
          };

          return (
            <div key={link.id} className="flex items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-white/5 hover:text-white transition rounded-2xl p-2"
                title={link.platform}
              >
                {getIcon(link.platform)}
              </a>
              {index < displayLinks.length - 1 && (
                <span className="h-6 w-px bg-white/10 ml-6 hidden sm:block"></span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center">
        <a
          href="mailto:mohmandkhan@gmail.com"
          className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white font-sans"
        >
          mohmandkhan@gmail.com
        </a>
      </p>
    </div>
  );
}
