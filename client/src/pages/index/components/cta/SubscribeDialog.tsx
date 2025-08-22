import { useAppSelector } from "@/app/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { Check, X } from "lucide-react";

interface SubscribeDialogProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
  errMessage: string;
}

const SubscribeDialog = ({
  show,
  setShow,
  isSuccess,
  errMessage,
}: SubscribeDialogProps) => {
  const { campus } = useAppSelector((state) => state.campus);

  return (
    <Dialog open={show} onOpenChange={setShow}>
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
              : errMessage}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
