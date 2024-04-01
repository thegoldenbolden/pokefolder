"use client";
import { Laptop, Moon, Sun } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>,
) {
  return (
    <NextThemesProvider
      themes={["light", "dark"]}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {props.children}
    </NextThemesProvider>
  );
}

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Laptop;

  const onClick = () => {
    const currentThemeIdx = themes.findIndex((x) => x === theme);
    if (currentThemeIdx === themes.length - 1) {
      setTheme(themes[0]);
    } else {
      setTheme(themes[currentThemeIdx + 1]);
    }
  };

  return (
    <Button
      aria-label="toggle theme"
      size="icon"
      onClick={onClick}
      variant="outline"
    >
      <span className="sr-only">change theme</span>
      <Icon />
    </Button>
  );
}
