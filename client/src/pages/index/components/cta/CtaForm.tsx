import { useSubscribeMutation } from "@/api/newsletter";
import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { LegacyRef } from "react";
import SubscribeDialog from "./SubscribeDialog";

interface CtaFormProps {
  ref: LegacyRef<HTMLElement>;
}

const CtaForm = ({ ref }: CtaFormProps) => {
  const { campus } = useAppSelector((state) => state.campus);

  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  const [email, setEmail] = React.useState<string>("");
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [alertErrMessage, setAlertErrMessage] = React.useState<string>("");
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
        setAlertErrMessage(
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

      <SubscribeDialog
        show={showDialog}
        setShow={setShowDialog}
        isSuccess={isSuccess}
        errMessage={alertErrMessage}
      />
    </section>
  );
};

export default CtaForm;
