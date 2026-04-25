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
    <section ref={ref} className="border-t bg-primary/5">
      <div className="container flex justify-center py-20 sm:py-24">
        <div className="w-full max-w-md space-y-3 rounded-2xl border border-border/50 bg-card p-6 text-left shadow-xl">
          <div className="mb-2 flex items-center gap-2">
            <BellRing className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold tracking-tight">
              Get food drop alerts
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              disabled={isSubscribing}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              type="email"
              placeholder="student@university.edu"
              required
              className="h-12 bg-background"
            />
            <Button
              disabled={isSubscribing || !email}
              className="h-12 px-6 font-bold"
              type="submit"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            The newsletter is free and you can unsubscribe at any time.
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
