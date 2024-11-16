import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex min-h-[80vh] flex-col items-center justify-center"
    >
      <div className="gradient-text mb-2 bg-primary-gradient text-8xl font-semibold">
        404
      </div>
      <h1 className="mb-2 text-center text-5xl font-medium text-gray-900 ">
        Page Not Found
      </h1>

      <Button size="lg" asChild variant="secondary-gradient" className="mt-6">
        <Link to="/">Return home</Link>
      </Button>
    </motion.div>
  );
};

export default NotFoundPage;
