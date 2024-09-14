"use client";

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
import { EventsCampus } from "@/enums/events.enum";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const options: { label: string; value: EventsCampus }[] = [
  {
    label: "Tampa",
    value: EventsCampus.Tampa,
  },
  {
    label: "St. Pete",
    value: EventsCampus.StPetersburg,
  },
  {
    label: "Sarasota",
    value: EventsCampus.SarasotaManatee,
  },
];

export function CampusSelect() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<EventsCampus>(EventsCampus.Tampa);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          Campus: {options.find((option) => option.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                  className={
                    option.value === value ? "font-medium" : "font-base"
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
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
