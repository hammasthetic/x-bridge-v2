"use client";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <Button
        color="primary"
        radius="sm"
        size="sm"
        variant="solid"
        onClick={() => setTheme(theme === "green" ? "red" : "green")}
      >
        {theme === "green" ? "Red" : "Green"}
      </Button>
    </div>
  );
}
