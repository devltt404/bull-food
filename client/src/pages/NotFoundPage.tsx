import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ viewTransitionName: "page-content" }} className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="gradient-text bg-primary-gradient mb-2 text-8xl font-semibold">
        404
      </div>
      <h1 className="mb-2 text-center text-4xl font-medium text-gray-900">
        Sorry, we couldn't find this page.
      </h1>

      <Button size="lg" variant="secondary" asChild className="mt-6">
        <Link viewTransition to="/">Return home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
