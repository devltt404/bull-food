import { useSubscribeMutation } from "@/api/newsletter.api";
import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const CtaForm = ({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement> }) => {
  const { campus } = useAppSelector((state) => state.campus);

  const [subscribe] = useSubscribeMutation();

  const [email, setEmail] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subscribe({ email, campus }).unwrap();
  };

  return (
    <section id="cta" ref={ctaRef} className="rounded-t-[125px] bg-primary/10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl py-24 text-center"
      >
        <h3 className="text-4xl font-semibold text-green-950">
          Subscribe to our newsletter
        </h3>
        <p className="my-6">
          Sign up for daily updates on featured free food events.
        </p>

        <div className="mx-auto max-w-lg">
          <div className="flex h-12 items-center space-x-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              type="email"
              placeholder="Your email address"
              className="h-full bg-white"
            />

            <Separator orientation="vertical" />

            <Button className="h-full" type="submit">
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The newsletter is free and you can unsubscribe at any time.
          </p>
        </div>
      </form>
    </section>
  );
};

export default CtaForm;
