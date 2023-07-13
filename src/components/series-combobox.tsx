'use client';

import { useState } from 'react';
import { ChevronUpDown } from '@/ui/icons';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function SeriesCombobox({ series }: { series: string[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] border-border justify-between sticky top-2 left-full z-50 hover:bg-spotlight hover:text-foreground"
        >
          {value
            ? series.find(
                (serie) => serie.toLowerCase() === value.toLowerCase(),
              )
            : 'Select Series'}
          <ChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Jump to series..." className="h-9" />
          <CommandEmpty>No series found.</CommandEmpty>
          <CommandGroup>
            {series.map((series) => (
              <CommandItem
                key={series}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                  if (document) {
                    const el = document.getElementById(series);
                    el && el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {series}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
