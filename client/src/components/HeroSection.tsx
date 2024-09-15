import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CurvedLine from "./svg/CurvedLine";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="mb-12 rounded-b-[150px] bg-primary/10 py-24">
      <div className="flex h-[20rem] items-center">
        <div className="container mx-auto">
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
            <div className="inline-block">on</div>{" "}
            <div className="relative inline-block">
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
          <p className="mb-10 mt-8 text-center text-lg">
            BullFood helps you find <span className="font-semibold">free</span>{" "}
            food events near you!
          </p>
          <div className="text-center">
            <Button variant="secondary" className="px-12 py-7 text-lg">
              Discover Now
              <ChevronRight strokeWidth={2} size={24} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
