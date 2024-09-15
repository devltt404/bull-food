import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CtaForm = ({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <section ref={ctaRef} className="rounded-t-[125px] bg-primary/10">
      <div className="py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-4xl font-semibold text-green-950">
            Subcribe to our newsletter
          </h3>
          <p className="mt-4">
            Sign up for daily updates on featured free food events.
          </p>

          <div className="mx-auto max-w-lg">
            <div className="mt-6 flex h-12 items-center space-x-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-full bg-white"
              />
              <Button className="h-full" type="submit">
                Subscribe
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The newsletter is free and you can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaForm;
