import React, { useEffect } from "react";
import { useThemeContext } from "@/lib/functions";
import { themes } from "./themes";
import { updateFavicon } from "./favicontheme";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();

  useEffect(() => {
    const colors = themes[theme];
    for (const [key, value] of Object.entries(colors)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }
    updateFavicon(theme);
  }, [theme]);

  return children;
};

export default ThemeWrapper;
