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
import { cn } from "@/utils/cn";
import { BellRing, Check, X } from "lucide-react";
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
    <section ref={ref}>
      <div className="container pb-16">
        <div className="w-full space-y-4 rounded-3xl border border-border/50 bg-card p-6 shadow-xl md:p-10">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" />
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              Get food drop alerts
            </h3>
          </div>

          <p className="text-muted-foreground">
            Sign up for daily updates on featured food events.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <Input
              disabled={isSubscribing}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              type="email"
              placeholder="student@university.edu"
              required
              className="h-14 flex-1 border-border bg-background text-base shadow-inner"
            />
            <Button
              disabled={isSubscribing || !email}
              type="submit"
              className="h-14 w-full px-8 text-base font-semibold sm:w-auto"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            You can unsubscribe anytime.
          </p>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-3">
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
              <p className="font-display text-2xl font-bold tracking-tight">
                {isSuccess ? "Subscribed!" : "Failed"}
              </p>
            </DialogTitle>
            <DialogDescription className="py-2 text-center text-base">
              {isSuccess
                ? `You will now receive daily newsletter about featured food events at USF - ${campus}.`
                : errorMsg}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CtaForm;
