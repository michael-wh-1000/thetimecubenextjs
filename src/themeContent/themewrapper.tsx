import React, { useEffect } from "react";
import { themes } from "./themes";
import { useAppearanceContext } from "@/lib/functions";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { appearance } = useAppearanceContext();
  const theme = appearance?.theme || "standard dark";

  useEffect(() => {
    const colors = themes[theme];
    for (const [key, value] of Object.entries(colors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }, [theme]);

  return children;
};

export default ThemeWrapper;
