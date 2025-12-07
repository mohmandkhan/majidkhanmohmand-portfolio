import { ArrowRight, Play, Star, Target } from "lucide-react";

interface HeroProps {
  data: any;
}

export default function TemplateHero({ data }: HeroProps) {
  if (!data) return null;

  return (
    <div className="relative pt-24 md:pt-32 pb-12 md:pb-20">
      {/* Background Image/Mask from template */}
      <div
        className="absolute inset-0 bg-center bg-cover -z-10"
        style={{
          backgroundImage:
            'url("https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp")',
          maskImage:
            "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
        }}
      />

      <div className="lg:px-8 max-w-7xl mt-12 md:mt-20 mr-auto mb-20 md:mb-40 ml-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div
              className="animate-fade-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="border-gradient inline-flex before:rounded-full bg-white/5 rounded-full pt-2 pr-3 sm:pr-4 pb-2 pl-3 sm:pl-4 backdrop-blur-lg gap-x-2 sm:gap-x-3 gap-y-2 sm:gap-y-3 items-center">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 font-sans text-zinc-300">
                  Award-Winning Design
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
                </span>
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] animate-fade-slide-in font-medium tracking-tighter font-manrope drop-shadow-lg"
              style={{
                animationDelay: "0.3s",
                maskImage:
                  "linear-gradient(150deg, transparent, black 0%, black 40%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(150deg, transparent, black 0%, black 40%, transparent)",
              }}
            >
              Senior Full Stack
              <br />
              <span className="bg-clip-text font-medium text-transparent tracking-tighter font-manrope bg-gradient-to-br from-white to-[#ffcd75] pr-1">
                Web Developer
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2 animate-fade-slide-in font-medium tracking-tight text-white/90 font-manrope">
              Cloud Architect & AI Automation Engineer
            </h2>

            <p
              className="animate-fade-slide-in text-base sm:text-lg text-white/70 max-w-xl mt-6"
              style={{ animationDelay: "0.4s" }}
            >
              A highly decorated web and cloud professional, delivering
              excellent quality software, infrastructure products, and AI
              automation services at a global scale.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-slide-in mt-8"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#contact"
                className="group inline-flex transition-all duration-300 hover:shadow-lg hover:bg-zinc-200 text-sm font-medium text-zinc-900 bg-white rounded-full pt-3 sm:pt-4 pr-6 sm:pr-8 pb-3 sm:pb-4 pl-6 sm:pl-8 shadow-[5.7px_5.7px_8.6px_rgba(0,_0,_0,_0.07),_13.7px_13.7px_10.9px_rgba(0,_0,_0,_0.099),_25.7px_25.7px_20.5px_rgba(0,_0,_0,_0.123),_45.8px_45.8px_36.6px_rgba(0,_0,_0,_0.147),_85.8px_85.8px_68.5px_rgba(0,_0,_0,_0.176),_205px_205px_163.4px_rgba(0,_0,_0,_0.246)] gap-x-2 sm:gap-x-3 gap-y-2 sm:gap-y-3 items-center justify-center cursor-pointer"
              >
                <span className="font-sans">Hire Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="group inline-flex hover:text-white transition-all duration-300 hover:border-white hover:bg-white/5 text-sm font-medium text-zinc-300 border-white/20 border rounded-full pt-3 sm:pt-4 pr-6 sm:pr-8 pb-3 sm:pb-4 pl-6 sm:pl-8 gap-x-2 sm:gap-x-3 gap-y-2 sm:gap-y-3 items-center justify-center cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="font-sans">View Projects</span>
              </a>
            </div>
          </div>

          {/* Right Stats / Profile Image */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-gradient before:rounded-3xl bg-gradient-to-br from-white/10 via-white/0 to-white/10 w-full h-fit rounded-2xl sm:rounded-3xl relative shadow-2xl backdrop-blur-md">
              <div
                className="animate-fade-slide-in pt-6 sm:pt-8 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-8 relative"
                style={{ animationDelay: "0.6s" }}
              >
                {/* Profile Image Integration */}
                <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                  <img
                    src="/majid-profile.png"
                    alt="Profile"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ring-1 flex items-center justify-center bg-white/10 ring-white/20">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl tracking-tighter font-manrope font-medium">
                      150+
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 font-sans">
                      Projects Delivered
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-white/70 font-sans">
                      Client Satisfaction
                    </span>
                    <span className="text-xs sm:text-sm font-sans">98%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r rounded-full from-white to-white/70"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent my-3 sm:my-4"></div>

                <div className="flex justify-between mb-3 sm:mb-4 gap-2">
                  <div className="text-center px-1 sm:px-2 cursor-pointer transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-white/5 hover:-translate-y-0.5 flex-1">
                    <div className="text-xl sm:text-2xl leading-tight bg-gradient-to-r from-white/95 to-neutral-200/80 bg-clip-text text-transparent font-sans font-medium">
                      12+
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wide font-sans">
                      Years
                    </div>
                  </div>
                  <div className="w-px h-10 sm:h-12 my-auto bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                  <div className="text-center px-1 sm:px-2 cursor-pointer transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-white/5 hover:-translate-y-0.5 flex-1">
                    <div className="text-xl sm:text-2xl leading-tight bg-gradient-to-r from-white/95 to-neutral-200/80 bg-clip-text text-transparent font-sans font-medium">
                      100%
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wide font-sans">
                      Quality
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 cursor-pointer transition-all duration-300 hover:-translate-y-px font-sans">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"></div>
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Marquee Section (Optional / Placeholder) */}
            <div
              className="overflow-hidden transition-all duration-300 animate-fade-slide-in border-gradient before:rounded-3xl bg-gradient-to-br from-white/10 via-white/0 to-white/10 w-full h-fit rounded-2xl sm:rounded-3xl relative shadow-lg backdrop-blur-md"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="pt-6 sm:pt-8 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-8 relative">
                <h3 className="text-base sm:text-lg mb-3 sm:mb-4 font-sans">
                  Trusted By
                </h3>
                <div className="overflow-hidden relative">
                  <div
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    }}
                  >
                    <div className="flex gap-4 sm:gap-6 animate-marquee whitespace-nowrap">
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Aller Media
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        World Bank
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Govt of Pakistan
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        StoresWiki
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Qurb Services
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Aller Media
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        World Bank
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Govt of Pakistan
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        StoresWiki
                      </span>
                      <span className="text-zinc-500 font-bold text-xl mx-4">
                        Qurb Services
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
