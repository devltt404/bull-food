import { useAppSelector } from "@/app/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";

const SubscribeAlert = ({
  show,
  setShow,
  isSuccess,
  errMessage,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
  errMessage: string;
}) => {
  const { campus } = useAppSelector((state) => state.campus);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close alert dialog when user presses Enter or clicks outside
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setShow(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      window.addEventListener("keydown", handleEnter);
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEnter);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [show, setShow]);

  return (
    <AlertDialog open={show}>
      <AlertDialogContent ref={dialogRef} className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="relative flex flex-col items-center justify-center gap-3">
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
          </AlertDialogTitle>
          <AlertDialogDescription className="py-2 text-center text-base">
            {isSuccess
              ? `You will now receive daily newsletter about featured free food events at USF - ${campus}.`
              : errMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            className={cn(
              "px-12 py-2",
              isSuccess
                ? "bg-primary hover:bg-primary/90"
                : "bg-destructive hover:bg-destructive/90",
            )}
            onClick={() => setShow(false)}
          >
            {isSuccess ? "OK" : "Try again"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscribeAlert;
