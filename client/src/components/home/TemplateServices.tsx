import {
  Eye,
  Layers,
  Users,
  CheckCircle,
  Code2,
  Cloud,
  Bot,
  Server,
  Database,
  Cpu,
} from "lucide-react";

export default function TemplateServices() {
  return (
    <section
      className="z-10 lg:px-8 animate-fade-slide-in max-w-7xl mr-auto ml-auto pt-20 pr-6 pb-20 pl-6 relative"
      id="services"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div className="">
          <p className="text-sm text-zinc-400 font-sans">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl text-white tracking-tighter font-manrope font-medium">
            Engineering Excellence
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mt-4 font-sans">
            Delivering robust, scalable, and innovative solutions across the
            full stack, cloud infrastructure, and AI automation.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative lg:col-span-2 ring-1 ring-white/10 p-10 overflow-hidden bg-zinc-950 border-zinc-900 rounded-3xl shadow-lg">
            <div className="absolute -left-10 -top-16 h-64 w-64 bg-gradient-to-tr rounded-full blur-3xl from-white/10 to-white/5"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl text-zinc-100 tracking-tighter font-manrope font-medium">
                Full Stack Development
              </h3>
            </div>
            <p className="text-zinc-300 max-w-2xl font-sans">
              Building scalable, high-performance web applications using modern
              technologies like React, Next.js, Node.js, and MongoDB. From
              interactive frontends to robust backends, I deliver complete
              solutions.
            </p>

            <div className="mt-8 grid grid-cols-5 gap-4 md:gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-xs text-zinc-400 font-sans">
                  Frontend
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-xs text-zinc-400 font-sans">Backend</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-zinc-400 opacity-70" />
                </div>
                <span className="text-xs text-zinc-400 font-sans">
                  Database
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-zinc-400" />
                </div>
                <span className="text-xs text-zinc-400 font-sans">Testing</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-zinc-400 font-sans">Deploy</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <article className="relative bg-zinc-900 border-white/10 border rounded-3xl p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl tracking-tight font-sans">
                  Cloud Architecture
                </h3>
                <span className="text-[11px] text-zinc-300 font-sans">
                  Expert
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-300 font-sans">
                Designing secure, scalable cloud infrastructure on AWS & Azure.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    AWS / Azure
                  </span>
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    Docker / K8s
                  </span>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    CI/CD Pipelines
                  </span>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    Serverless
                  </span>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-2 text-[11px] rounded-full px-2 py-1 ring-1 font-sans text-zinc-200 bg-white/10 ring-white/20">
                  <Cloud className="w-3 h-3" />
                  Cloud Native
                </span>
              </div>
            </article>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <article className="relative bg-zinc-900 border-white/10 border rounded-3xl p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl tracking-tight font-sans">
                  AI Automation
                </h3>
              </div>
              <p className="mt-2 text-sm text-zinc-300 font-sans">
                Streamlining workflows with intelligent automation solutions.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    n8n Workflows
                  </span>
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    LLM Integration
                  </span>
                  <Cpu className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center justify-between rounded-2xl ring-1 px-3 py-2 ring-white/20 bg-white/10">
                  <span className="text-sm font-sans text-zinc-200">
                    Custom Agents
                  </span>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-2">
            <aside className="relative overflow-hidden rounded-3xl flex flex-col bg-zinc-950 border-zinc-900 border p-8 h-full">
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <span className="font-sans">Technical Leadership</span>
              </div>
              <h4 className="mt-4 text-3xl md:text-4xl text-zinc-100 tracking-tighter font-manrope font-medium">
                Turning complex problems into elegant solutions
              </h4>
              <p className="text-base text-zinc-300 mt-3 font-sans">
                With over a decade of experience, I lead teams to success
                through strategic planning, architectural decisions, and
                efficient execution. I bridge the gap between business goals and
                technical implementation.
              </p>

              <div className="mt-8 grid grid-cols-12 gap-2 h-16 items-end">
                <span className="h-4 rounded-3xl bg-white/40"></span>
                <span className="h-6 rounded-3xl bg-white/50"></span>
                <span className="h-8 rounded-3xl bg-white/60"></span>
                <span className="h-12 rounded-3xl bg-white/70"></span>
                <span className="h-10 rounded-3xl bg-white/80"></span>
                <span className="h-14 rounded-3xl bg-white/90"></span>
                <span className="h-6 rounded-3xl bg-white/50"></span>
                <span className="h-9 rounded-3xl bg-white/60"></span>
                <span className="h-5 rounded-3xl bg-white/70"></span>
                <span className="h-11 rounded-3xl bg-white/80"></span>
                <span className="h-7 rounded-3xl bg-white/50"></span>
                <span className="h-3 rounded-3xl bg-white/60"></span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-zinc-300 text-sm">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="font-sans">
                  Drive measurable growth and engagement.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
