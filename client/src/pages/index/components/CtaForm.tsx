import { useSubscribeMutation } from "@/api/newsletter";
import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Check, X } from "lucide-react";
import React, { LegacyRef } from "react";

interface CtaFormProps {
  ref: LegacyRef<HTMLElement>;
}

const CtaForm = ({ ref }: CtaFormProps) => {
  const { campus } = useAppSelector((state) => state.campus);

  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  const [email, setEmail] = React.useState<string>("");
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    subscribe({ email, campus })
      .unwrap()
      .then(() => {
        setEmail("");
        setIsSuccess(true);
        setShowDialog(true);
      })
      .catch((e) => {
        setErrorMsg(
          e.data?.message || "Unable to subscribe. Please try again later.",
        );
        setIsSuccess(false);
        setShowDialog(true);
      });
  };

  return (
    <section
      ref={ref}
      className="rounded-t-[75px] bg-primary/10 md:rounded-t-[100px] xl:rounded-t-[125px]"
    >
      <form
        onSubmit={handleSubmit}
        className="container mx-auto max-w-2xl py-20 text-center sm:py-24"
      >
        <h3 className="text-4xl font-semibold text-green-950">
          Subscribe to our newsletter
        </h3>
        <p className="my-6 font-medium">
          Sign up for daily updates on featured free food events.
        </p>

        <div className="mx-auto max-w-lg">
          <div className="flex h-12 items-center space-x-4">
            <Input
              disabled={isSubscribing}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              type="email"
              placeholder="Your email address"
              className="h-full bg-white"
            />

            <Separator orientation="vertical" />

            <Button
              disabled={isSubscribing || !email}
              className="h-full"
              type="submit"
            >
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-800">
            The newsletter is free and you can unsubscribe at any time.
          </p>
        </div>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="relative flex flex-col items-center justify-center gap-3">
              <div
                className={cn(
                  "rounded-full p-2",
                  isSuccess ? "bg-primary" : "bg-destructive",
                )}
              >
                {isSuccess ? (
                  <Check className="h-10 w-10 text-white" />
                ) : (
                  <X className="h-10 w-10 text-white" />
                )}
              </div>

              <p className="text-2xl font-semibold">
                {isSuccess ? "Subscribed!" : "Failed"}
              </p>
            </DialogTitle>
            <DialogDescription className="py-2 text-center text-base">
              {isSuccess
                ? `You will now receive daily newsletter about featured free food events at USF - ${campus}.`
                : errorMsg}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CtaForm;
