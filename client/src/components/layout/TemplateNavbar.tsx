import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function TemplateNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed animate-fade-slide-in z-50 top-6 left-0 right-0 w-full flex justify-center px-4">
      <div className="flex bg-zinc-900/80 border-white/10 border rounded-full pt-3 pr-3 pb-3 pl-3 backdrop-blur-xl gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-8 items-center w-full max-w-4xl">
        <div className="flex gap-2 gap-x-2 gap-y-2 items-center">
          {/* Logo placeholder - using text for now if image is specific to template */}
          <a
            href="#"
            className="text-xl font-bold font-manrope text-white px-2 hover:text-zinc-300 transition-colors"
          >
            MKM
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm flex-1 justify-center">
          <a
            href="#projects"
            className="text-zinc-400 hover:text-white transition font-sans whitespace-nowrap"
          >
            Work
          </a>
          <a
            href="#services"
            className="text-zinc-400 hover:text-white transition font-sans whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white transition font-sans whitespace-nowrap"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-zinc-400 hover:text-white transition font-sans whitespace-nowrap"
          >
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition bg-white hover:bg-zinc-200 text-zinc-900 whitespace-nowrap"
        >
          <span className="font-sans">Let's Talk</span>
          <ArrowRight className="w-4 h-4 opacity-50" />
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 transition ml-auto text-white"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-zinc-900/95 border border-white/10 rounded-2xl p-4 flex flex-col gap-4 backdrop-blur-xl md:hidden">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-400 hover:text-white transition font-sans p-2"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-400 hover:text-white transition font-sans p-2"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-400 hover:text-white transition font-sans p-2"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-400 hover:text-white transition font-sans p-2"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
