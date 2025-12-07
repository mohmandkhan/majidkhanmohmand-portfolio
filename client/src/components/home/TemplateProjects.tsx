import { useState } from "react";
import {
  ArrowRight,
  PlusCircle,
  Layout,
  Smartphone,
  PieChart,
  Palette,
  Globe,
  Loader2,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  url: string;
  category: string | null;
}

interface ProjectsProps {
  projects: Project[];
}

export default function TemplateProjects({ projects }: ProjectsProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const displayProjects = projects || [];

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, displayProjects.length));
  };

  if (displayProjects.length === 0) return null;

  return (
    <section className="z-10 pt-40 pb-40 relative" id="projects">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
        }}
      >
        {/* Optional Background Element if needed */}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sm:p-8 bg-zinc-900 border-zinc-800 border rounded-3xl p-6 animate-fade-slide-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column: Title & Intro */}
            <div className="flex flex-col justify-between min-h-full">
              <div className="sticky top-24">
                <div>
                  <span className="text-sm text-zinc-500 font-sans">
                    Featured Work
                  </span>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl leading-[0.9] text-zinc-100 mt-2 tracking-tighter font-manrope font-medium">
                    Recent Projects
                  </h2>

                  <div className="mt-8 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"></div>
                    </div>
                    <div className="hidden sm:grid grid-cols-3 gap-6 text-zinc-600 bg-zinc-900 px-4 relative">
                      <div className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        <span className="text-sm font-sans">Full Stack</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        <span className="text-sm font-sans">Cloud Arch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        <span className="text-sm font-sans">AI Automation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-zinc-100 tracking-tight font-sans">
                      Innovation & Quality
                    </p>
                    <p className="mt-1 text-sm text-zinc-400 font-sans">
                      Transforming ideas into robust digital solutions. From web
                      apps to complex AI systems.
                    </p>
                    <a
                      href="https://github.com/mohmandkhan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-zinc-100 text-zinc-900 text-sm hover:bg-zinc-200 transition font-sans"
                    >
                      View GitHub
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Project Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayProjects.slice(0, visibleCount).map(project => (
                  <a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden h-[200px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800 rounded-3xl group"
                  >
                    <div
                      className="absolute inset-0 bg-cover hover:scale-105 transition-transform duration-500 bg-center"
                      style={{
                        backgroundImage: `url(${project.imageUrl || "/majid-profile.png"})`,
                        opacity: project.imageUrl ? 1 : 0.3,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

                    <div className="absolute top-3 left-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-zinc-100/90 text-zinc-900 border border-zinc-700">
                        <Globe className="w-4 h-4 opacity-50" />
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-xl bg-zinc-900/60 backdrop-blur text-[11px] text-zinc-300 border border-zinc-800 font-sans">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-lg tracking-tight leading-tight font-sans truncate">
                        {project.title}
                      </p>
                      {project.description && (
                        <p className="text-zinc-400 text-xs font-sans line-clamp-1 mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>

              {visibleCount < displayProjects.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={showMore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans transition-colors"
                  >
                    <span>Load More Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
