'use client';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';
import { ChevronUp } from '@/ui/icons';

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer
      className={cn(
        'fixed left-0 top-full max-h-[90vh] transition-transform w-screen bg-background border-t-2 border-border border-solid',
        { '-translate-y-full': open },
      )}
    >
      <div className="relative py-4 px-3 lg:px-12">
        <Button
          className="absolute hover:bg-background focus-visible:bg-background hover:text-foreground focus-visible:text-foreground right-4 lg:right-24 xl:right-40 bottom-full translate-y-[1.5px] px-4 bg-background border-2 border-t-border border-b-background/75 border-x-border text-foreground z-10"
          onClick={() => setOpen((p) => !p)}
        >
          <ChevronUp
            className={cn('w-6 h-6 transition-transform', {
              'rotate-180': open,
            })}
          />
        </Button>
        <div>
          The literal and graphical information presented on this site about
          Pokemon, including card data, Pokemon, The Pokemon TCG, and The
          Pokemon TCG Online and its trademarks are ©1995- 2023 Nintendo, The
          Pokémon Company International, Inc, and GAMEFREAK. This website is not
          produced, endorsed, supported, or affiliated with Nintendo, The
          Pokémon Company International, Inc, or GAMEFREAK. All other content ©
          2023 PokeFolder.
        </div>
      </div>
    </footer>
  );
}
