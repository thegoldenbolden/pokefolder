"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "./icons";
import { Button } from "./ui/button";

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window) return;

    const onScroll = () => {
      setVisible(window.scrollY > window.outerHeight / 2);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTop = () => {
    if (!window) return;
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <Button
      data-visible={visible}
      variant="fg"
      className="fixed right-3 top-full translate-y-full rounded-full p-2 data-[visible=true]:-translate-y-[calc(100%+1rem)] motion-safe:transition-all"
      onClick={scrollTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-10 drop-shadow-md" />
    </Button>
  );
}
