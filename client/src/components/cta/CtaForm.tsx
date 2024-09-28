import { useSubscribeMutation } from "@/api/newsletter.api";
import { useAppSelector } from "@/app/hooks";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import SubscribeAlert from "./SubscribeAlert";

const CtaForm = ({ ctaRef }: { ctaRef: React.RefObject<HTMLDivElement> }) => {
  const { campus } = useAppSelector((state) => state.campus);

  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  const [email, setEmail] = React.useState<string>("");
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertErrMessage, setAlertErrMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    subscribe({ email, campus })
      .unwrap()
      .then(() => {
        setEmail("");
        setIsSuccess(true);
        setShowAlert(true);
      })
      .catch((e) => {
        setAlertErrMessage(
          e.data?.message ||
            "Unable to subscribe. Please try again later.",
        );
        setIsSuccess(false);
        setShowAlert(true);
      });
  };

  return (
    <section
      id="cta"
      ref={ctaRef}
      className="rounded-t-[75px] bg-primary/10 md:rounded-t-[100px] xl:rounded-t-[125px]"
    >
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
              disabled={isSubscribing}
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              type="email"
              placeholder="Your email address"
              className="h-full bg-white"
            />

            <Separator orientation="vertical" />

            <Button disabled={isSubscribing} className="h-full" type="submit">
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The newsletter is free and you can unsubscribe at any time.
          </p>
        </div>
      </form>

      <SubscribeAlert
        show={showAlert}
        setShow={setShowAlert}
        isSuccess={isSuccess}
        errMessage={alertErrMessage}
      />
    </section>
  );
};

export default CtaForm;
