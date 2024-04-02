import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PokemonCarousel(props: React.ComponentProps<typeof Carousel>) {
  return (
    <Carousel
      opts={{ loop: true, align: "start", dragFree: true }}
      className="relative flex w-full flex-col gap-2"
      {...props}
    />
  );
}

export function PokemonCarouselHeader(props: React.PropsWithChildren) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4">
      {props.children}
      <div className="flex flex-wrap items-center justify-end gap-1">
        <CarouselPrevious size={null} className="p-2" variant="muted" />
        <CarouselNext size={null} className="p-2" variant="muted" />
      </div>
    </div>
  );
}

export function PokemonCarouselContent(
  props: React.ComponentProps<typeof CarouselContent>,
) {
  return (
    <div className="overflow-hidden border-y border-y-border bg-muted px-4 pb-2 pt-4 shadow-inner shadow-black/10 xl:rounded-xl xl:border-x xl:border-x-border">
      <CarouselContent {...props} />
    </div>
  );
}

export function PokemonCarouselItem(
  props: React.ComponentProps<typeof CarouselItem>,
) {
  return (
    <CarouselItem
      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
      {...props}
    />
  );
}

export function PokemonCarouselEmpty() {
  return (
    <CarouselItem className="basis-full">
      <p className="text-center font-bungee text-lg tracking-wide">
        Unable to find cards
      </p>
    </CarouselItem>
  );
}
