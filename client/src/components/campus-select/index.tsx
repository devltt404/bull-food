"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EventCampus } from "@/constants/event.constant";
import { setCampus } from "@/features/campus";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

export function CampusSelect() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { campus } = useAppSelector((state: RootState) => state.campus);
  const dispatch = useAppDispatch();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          <p className="truncate">Campus: {campus}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {Object.values(EventCampus).map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    dispatch(setCampus(option));
                    setOpen(false);
                  }}
                  className={cn(
                    option === campus ? "font-medium" : "font-base",
                    "py-2",
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option === campus ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CampusSelect;
