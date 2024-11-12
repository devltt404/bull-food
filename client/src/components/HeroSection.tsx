import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CurvedLine from "./svg/CurvedLine";
import { Button } from "./ui/button";

const HeroSection = ({
  ctaRef,
}: {
  ctaRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="relative rounded-b-[75px] bg-gradient-to-b from-transparent to-green-100 to-80% py-28 md:rounded-b-[100px] md:py-32 xl:rounded-t-[125px]">
      <div className="relative mx-auto">
        <h1 className="spacing flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-6xl font-bold leading-snug [word-spacing:5px]">
          <div className="inline-block bg-primary px-6 py-2 text-white">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Hungry
            </motion.div>
          </div>
          <div className="inline-block text-green-800">on</div>
          <div className="gradient-text relative bg-gradient-to-r from-green-800 to-primary">
            Campus?
            <motion.div
              className="absolute -bottom-3 -left-3"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <CurvedLine className="fill-primary" />
            </motion.div>
          </div>
        </h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="mx-10 my-12 text-center text-xl font-medium text-gray-700"
        >
          BullFood helps you find{" "}
          <span className="font-semibold text-green-600">free</span> food events
          at USF!
        </motion.p>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            className="transform rounded-lg bg-gradient-to-r from-violet-700 to-secondary px-11 py-7 text-lg font-semibold transition hover:shadow-lg"
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
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="text-lg font-medium">Subscribe now</p>
          <ChevronDown className="-mt-1" size={24} />
        </motion.div>
      </button>
    </div>
  );
};

export default HeroSection;
