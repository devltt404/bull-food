import { Button } from "@/components/ui/button";
import { createFadeStagger } from "@/utils/animation";
import { ChevronDown, ChevronRight, SparklesIcon } from "lucide-react";
import { RefObject } from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  ctaRef: RefObject<HTMLDivElement | null>;
}

const HeroSection = ({ ctaRef }: HeroSectionProps) => {
  const staggerDelay = createFadeStagger(0.05);
  return (
    <div className="hero relative py-24 md:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className="animate-fade-up mb-5 inline-flex items-center rounded-full border-2 border-dashed border-primary/50 px-3 py-1 text-sm font-medium text-primary"
          {...staggerDelay()}
        >
          <SparklesIcon className="mr-2 h-4 w-4" />
          Your campus food radar
        </div>
        <h1
          className="animate-fade-up font-display text-7xl font-extrabold tracking-tight"
          {...staggerDelay()}
        >
          Never miss a{" "}
          <span className="relative inline-block text-primary">
            food event
            <svg
              className="absolute -bottom-1 left-0 h-3 w-full text-primary/30"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>{" "}
          on campus again.
        </h1>

        <p
          className="animate-fade-up mx-10 my-8 text-center text-xl text-muted-foreground"
          {...staggerDelay()}
        >
          Discover pizza, club socials, and food truck pop-ups happening right
          now. Get alerts before the good stuff runs out.
        </p>

        <div className="animate-fade-up text-center" {...staggerDelay()}>
          <Button asChild className="h-14 px-8 text-lg font-semibold shadow-lg">
            <Link to="/events">
              Discover now
              <ChevronRight strokeWidth="3" />
            </Link>
          </Button>
        </div>
      </div>

      <button
        className="animate-fade-up absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-muted-foreground transition hover:text-green-900"
        onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })}
        {...staggerDelay()}
      >
        <p className="text-lg font-medium">Subscribe now</p>
        <ChevronDown className="size-6" />
      </button>
    </div>
  );
};

export default HeroSection;
