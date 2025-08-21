import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { EventCampus } from "@/constants/event.constant";
import { setCampus } from "@/features/campus";
import { Link } from "react-router-dom";

const Header = () => {
  const { campus } = useAppSelector((state: RootState) => state.campus);
  const dispatch = useAppDispatch();

  return (
    <header className="border-b-2 bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <img src="/logo.webp" className="h-10 w-10" alt="BullFood logo" />
          <p className="gradient-text bg-primary-gradient invisible text-2xl font-medium sm:visible">
            Bull<span className="font-semibold text-primary">Food.</span>
          </p>
          <span className="sr-only">BullFood homepage</span>
        </Link>
        <Select
          onValueChange={(value) => {
            dispatch(setCampus(value as EventCampus));
          }}
        >
          <SelectTrigger className="w-fit font-medium !text-foreground">
            Campus: {campus}
          </SelectTrigger>
          <SelectContent>
            {Object.values(EventCampus).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;
