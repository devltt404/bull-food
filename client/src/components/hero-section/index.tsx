import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CurvedLine from "../svg/curved-line";
import { Button } from "../ui/button";
import { HeroSectionComponent } from "./types";

const HeroSection: HeroSectionComponent = ({ ctaRef }) => {
  return (
    <div className="relative py-28 md:py-32">
      <div className="relative mx-auto">
        <h1
          className="spacing flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-4 text-6xl font-bold leading-snug [word-spacing:5px]"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <div className="inline-block bg-primary-gradient px-3 py-2 text-white md:px-6">
            Hungry
          </div>
          <div className="inline-block text-green-800">on</div>
          <div className="gradient-text relative bg-primary-gradient">
            Campus?
            <div className="absolute -bottom-3 -left-3">
              <CurvedLine className="fill-primary" />
            </div>
          </div>
        </h1>

        <p
          className="mx-10 my-12 animate-fade-up text-center text-xl font-medium text-gray-700"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          BullFood helps you find{" "}
          <span className="font-semibold underline">free</span> food events at
          USF!
        </p>

        <motion.div
          className="animate-fade-up text-center"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <Button
            asChild
            variant="secondary-gradient"
            className="gradient-bg-hover rounded-lg px-11 py-7 text-lg"
          >
            <Link to="/events">
              Discover Now
              <ChevronRight
                strokeWidth={2}
                size={24}
                className="ml-2 stroke-[2.5px]"
              />
            </Link>
          </Button>
        </motion.div>
      </div>

      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 transition hover:text-green-950"
        onClick={() => {
          ctaRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div
          className="flex animate-fade-up flex-col items-center"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <p className="text-lg font-medium">Subscribe now</p>
          <ChevronDown className="-mt-1" size={24} />
        </div>
      </button>
    </div>
  );
};

export default HeroSection;
