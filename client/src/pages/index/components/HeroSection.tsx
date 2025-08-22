import CurvedLine from "@/components/svg/CurvedLine";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { RefObject } from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  ctaRef: RefObject<HTMLDivElement | null>;
}

const HeroSection = ({ ctaRef }: HeroSectionProps) => {
  return (
    <div className="hero relative py-28 md:py-32">
      <div className="relative mx-auto">
        <h1
          className="animate-fade-up flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-6xl leading-snug font-bold [word-spacing:5px]"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="bg-primary-gradient inline-block px-3 py-2 text-white md:px-6">
            Hungry
          </div>
          <div className="inline-block text-green-600">on</div>
          <div className="gradient-text bg-primary-gradient relative">
            Campus?
            <div className="absolute -bottom-3 -left-3">
              <CurvedLine className="fill-primary" />
            </div>
          </div>
        </h1>

        <p
          className="animate-fade-up mx-10 my-12 text-center text-xl font-medium text-gray-700"
          style={{ animationDelay: "0.25s" }}
        >
          BullFood helps you find{" "}
          <span className="font-semibold underline">food events</span> at USF!
        </p>

        <div
          className="animate-fade-up text-center"
          style={{ animationDelay: "0.35s" }}
        >
          <Button
            asChild
            className="bg-secondary-gradient hover-bg-gradient h-13 !px-10 text-lg font-medium"
            variant="secondary"
          >
            <Link to="/events">
              Discover Now
              <ChevronRight strokeWidth="3" />
            </Link>
          </Button>
        </div>
      </div>

      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 transition hover:text-green-950"
        onClick={() => {
          ctaRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div
          className="animate-fade-up flex flex-col items-center"
          style={{ animationDelay: "0.45s" }}
        >
          <p className="text-lg font-medium">Subscribe now</p>
          <ChevronDown size={24} />
        </div>
      </button>
    </div>
  );
};

export default HeroSection;
