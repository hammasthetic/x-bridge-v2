"use client";
import { Select, SelectItem } from "@heroui/react";
import { Sun, Moon, Palette, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set system theme as default
    if (!theme || theme === "system") {
      setTheme("system");
    }
  }, [theme, setTheme]);

  if (!mounted) return null;

  const themes = [
    { key: "system", label: "System", icon: <Monitor className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: "light", label: "Light", icon: <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: "dark", label: "Dark", icon: <Moon className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: "red", label: "Red", icon: <Palette className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: "green", label: "Green", icon: <Palette className="w-3 h-3 sm:w-4 sm:h-4" /> },
  ];

  return (
    <div className="flex items-center justify-center">
      <Select
        className="w-full sm:w-32"
        classNames={{
          base: "bg-transparent transition-all duration-200",
          mainWrapper: "bg-transparent",
          value: "text-primary text-[0.65rem] sm:text-xs md:text-sm",
          listboxWrapper: "rounded-sm sm:rounded-md",
          popoverContent: "rounded-sm sm:rounded-md bg-content1",
          innerWrapper: "bg-transparent",
          label: "text-content2",
          selectorIcon: "text-content2",
          trigger: "hover:bg-content1/50 transition-all duration-200",
        }}
        color="primary"
        size="sm"
        variant="underlined"
        placeholder="Select theme"
        selectedKeys={[theme || "system"]}
        onChange={(e) => setTheme(e.target.value)}
        startContent={<Palette className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />}
      >
        {themes.map((t) => (
          <SelectItem
            key={t.key}
            className="text-[0.65rem] sm:text-xs md:text-sm hover:bg-primary/10 transition-all duration-200"
            startContent={t.icon}
          >
            {t.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
