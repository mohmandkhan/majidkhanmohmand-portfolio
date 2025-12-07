import { MessageSquare, Star } from "lucide-react";

interface Review {
  id: number;
  reviewerName: string;
  reviewerCountry: string | null;
  comment: string | null;
  rating: string | null;
  gigTitle: string | null;
  priceRange: string | null;
  duration: string | null;
}

interface TestimonialsProps {
  reviews: Review[];
}

export default function TemplateTestimonials({ reviews }: TestimonialsProps) {
  // If no reviews, we can use placeholders or return null
  const displayReviews =
    reviews && reviews.length > 0
      ? reviews
      : [
          {
            id: 1,
            reviewerName: "Sarah Chen",
            reviewerCountry: "CEO, TechFlow",
            comment:
              "The team transformed our digital presence completely. Professional, creative, and delivered beyond expectations. Highly recommended!",
            rating: "5",
          },
          {
            id: 2,
            reviewerName: "Michael Ross",
            reviewerCountry: "CTO, DataVerse",
            comment:
              "Outstanding work from start to finish. The design perfectly captures our vision and user experience has dramatically improved.",
            rating: "5",
          },
          {
            id: 3,
            reviewerName: "Emma Taylor",
            reviewerCountry: "Founder, CreativeHub",
            comment:
              "Exceptional creativity and attention to detail. They helped us stand out in a crowded market with stunning visuals.",
            rating: "5",
          },
        ];

  return (
    <section className="animate-fade-slide-in lg:pt-44 lg:pl-8 lg:pr-8 lg:pb-44 max-w-6xl mx-auto pt-44 pr-8 pb-44 pl-8">
      <div className="mb-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm font-medium uppercase tracking-tight text-zinc-400">
              <span className="font-sans">Testimonials</span>
              <span className="font-sans">
                ({displayReviews.length.toString().padStart(2, "0")})
              </span>
            </div>
            <div className="mt-2 h-px w-full bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-center">
            <div className="lg:col-span-7">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.9] uppercase text-white tracking-tighter font-manrope font-medium">
                What Clients Say
              </h3>
            </div>

            <div className="lg:col-span-5">
              <p className="text-lg text-zinc-300 max-w-3xl mb-6 font-sans">
                Real feedback from partnerships that drive exceptional results
                and lasting success.
              </p>
              <div className="flex justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 ring-1 ring-zinc-700 hover:shadow-lg transition bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 hover:ring-white/20"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white">
                    <MessageSquare className="w-5 h-5 text-zinc-900" />
                  </span>
                  <span className="px-3 text-sm font-sans text-white">
                    Get Started
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-sm ring-1 ring-zinc-800">
        {displayReviews.slice(0, 3).map((review, index) => (
          <div
            key={review.id}
            className={`relative overflow-hidden p-6 ${index % 2 === 1 ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"}`}
          >
            <div className="flex gap-2 mb-4 items-center">
              <MessageSquare
                className={`w-6 h-6 ${index % 2 === 1 ? "text-zinc-900" : "text-white"}`}
              />
            </div>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(parseInt(review.rating || "5"))].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 fill-current ${index % 2 === 1 ? "text-zinc-900" : "text-white"}`}
                />
              ))}
            </div>
            <p className="text-base leading-relaxed mb-6 font-sans relative z-10">
              {review.comment}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-sans font-bold">
                  {review.reviewerName}
                </div>
                <div
                  className={`text-xs mt-1 font-sans ${index % 2 === 1 ? "text-zinc-600" : "text-zinc-400"}`}
                >
                  {review.reviewerCountry}
                </div>
              </div>
              {/* Placeholder Avatar or Initials */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${index % 2 === 1 ? "bg-zinc-200 text-zinc-900" : "bg-zinc-800 text-white"}`}
              >
                {review.reviewerName.charAt(0)}
              </div>
            </div>
          </div>
        ))}

        <div className="lg:col-span-3 border-t border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            <div className="text-white bg-zinc-900 border-zinc-800 border-r p-6">
              <div className="text-4xl mb-2 tracking-tighter font-manrope font-medium">
                98%
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Client satisfaction rate across all projects
              </div>
            </div>
            <div className="p-6 border-r bg-zinc-900 text-white border-zinc-800">
              <div className="text-4xl mb-2 tracking-tighter font-manrope font-medium">
                5+ Years
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Industry experience with top brands
              </div>
            </div>
            <div className="p-6 bg-zinc-900 text-white">
              <div className="text-4xl mb-2 tracking-tighter font-manrope font-medium">
                150+
              </div>
              <div className="text-xs text-zinc-400 font-sans">
                Successful projects delivered globally
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
