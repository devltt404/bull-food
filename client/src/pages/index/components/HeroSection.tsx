import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, SparklesIcon } from "lucide-react";
import { RefObject } from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  ctaRef: RefObject<HTMLDivElement | null>;
}

const HeroSection = ({ ctaRef }: HeroSectionProps) => {
  return (
    <div className="hero relative py-24 md:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <SparklesIcon className="mr-2 h-4 w-4" />
          Your campus food radar
        </div>
        <h1
          className="animate-fade-up font-display text-7xl font-extrabold tracking-tight"
          style={{ animationDelay: "0.15s" }}
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
                stroke-width="4"
                fill="none"
              />
            </svg>
          </span>{" "}
          on campus again.
        </h1>

        <p
          className="animate-fade-up mx-10 my-8 text-center text-xl text-muted-foreground"
          style={{ animationDelay: "0.25s" }}
        >
          Discover free pizza, club socials, and food truck pop-ups happening
          right now. Get alerts before the good stuff runs out.
        </p>

        <div
          className="animate-fade-up text-center"
          style={{ animationDelay: "0.35s" }}
        >
          <Button asChild className="text-lg h-14 px-8 font-semibold shadow-lg">
            <Link viewTransition to="/events">
              Discover now
              <ChevronRight strokeWidth="3" />
            </Link>
          </Button>
        </div>
      </div>

      <button
        className="animate-fade-up absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-muted-foreground transition hover:text-green-900"
        onClick={() => {
          ctaRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{ animationDelay: "0.45s" }}
      >
        <p className="text-lg font-medium">Subscribe now</p>
        <ChevronDown className="size-6" />
      </button>
    </div>
  );
};

export default HeroSection;
