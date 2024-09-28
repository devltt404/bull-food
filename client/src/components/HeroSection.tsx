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
    <div className="relative xl:rounded-b-[125px] md:rounded-b-[100px] rounded-b-[75px] bg-primary/10 py-36">
      <div className="relative mx-auto">
        <h1 className="text-center text-6xl font-semibold leading-tight">
          <div className="inline-block bg-primary px-6 py-2 text-white">
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Hungry
            </motion.div>
          </div>{" "}
          <div className="inline-block text-green-950">on</div>{" "}
          <div className="relative inline-block text-green-950">
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
          className="mb-10 mt-8 text-center text-lg text-gray-700"
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
          <Button asChild variant="secondary" className="px-12 py-7 text-lg">
            <Link to="/events">
              Discover Now
              <ChevronRight strokeWidth={2} size={24} className="ml-2" />
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
