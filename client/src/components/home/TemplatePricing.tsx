import { CheckCircle, XCircle, Star } from "lucide-react";

export default function TemplatePricing() {
  return (
    <section className="animate-fade-slide-in lg:pt-40 lg:pl-8 lg:pr-8 lg:pb-40 max-w-7xl z-10 mx-auto pt-40 pr-8 pb-40 pl-8 relative">
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900/60 ring-1 ring-white/10 p-10 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div className="">
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs mb-3 font-sans border-white/30 bg-white/15 text-zinc-200">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl text-white mt-2 tracking-tighter font-manrope font-medium">
              Simple plans for every need
            </h2>
          </div>
          <p className="text-base text-zinc-300 max-w-md font-sans">
            Choose the perfect package for your project. Flexible pricing,
            exceptional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 hover:bg-zinc-900/60 transition-colors">
            <h3 className="text-xl text-white tracking-tight font-sans">
              Starter
            </h3>
            <p className="text-sm text-zinc-400 mt-1 font-sans">
              For small projects
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl text-white tracking-tighter font-manrope font-medium">
                $2,500
              </span>
              <span className="text-sm text-zinc-400 font-sans">/project</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                Up to 5 pages
              </li>
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                Responsive design
              </li>
              <li className="flex items-center gap-2 font-sans">
                <XCircle className="w-4 h-4 text-zinc-600" />
                Custom animations
              </li>
              <li className="flex items-center gap-2 font-sans">
                <XCircle className="w-4 h-4 text-zinc-600" />
                Priority support
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white h-11 ring-1 ring-white/10 text-sm transition-colors font-sans"
            >
              Get started
            </a>
          </div>

          <div className="bg-zinc-950 rounded-3xl p-6 relative border-gradient before:rounded-3xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1 text-xs border rounded-full px-3 py-1 backdrop-blur-md font-sans text-zinc-200 bg-white/15 border-white/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                Most popular
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-white tracking-tight font-sans">
                  Professional
                </h3>
              </div>
              <p className="text-sm text-zinc-400 mt-1 font-sans">
                For growing businesses
              </p>
              <div className="flex gap-1 mt-4 items-baseline">
                <span className="text-4xl text-white tracking-tighter font-manrope font-medium">
                  $7,500
                </span>
                <span className="text-sm text-zinc-400 font-sans">
                  /project
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                <li className="flex gap-2 items-center font-sans">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Up to 15 pages
                </li>
                <li className="flex gap-2 items-center font-sans">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Custom animations
                </li>
                <li className="flex items-center gap-2 font-sans">
                  <CheckCircle className="w-4 h-4 text-white" />
                  CMS integration
                </li>
                <li className="flex items-center gap-2 font-sans">
                  <CheckCircle className="w-4 h-4 text-white" />
                  Priority support
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full text-zinc-900 h-11 ring-1 text-sm transition-colors shadow-lg font-sans bg-white hover:bg-zinc-200 ring-white/30"
              >
                Start project
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 hover:bg-zinc-900/60 transition-colors">
            <h3 className="text-xl text-white tracking-tight font-sans">
              Enterprise
            </h3>
            <p className="text-sm text-zinc-400 mt-1 font-sans">
              For large organizations
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl text-white tracking-tighter font-manrope font-medium">
                Custom
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                Unlimited pages
              </li>
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                Advanced features
              </li>
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                Dedicated team
              </li>
              <li className="flex items-center gap-2 font-sans">
                <CheckCircle className="w-4 h-4 text-white" />
                24/7 support
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white/10 hover:bg-white/15 text-white h-11 ring-1 ring-white/10 text-sm transition-colors font-sans"
            >
              Contact sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
