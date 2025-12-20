"use client";

import { useAppearanceContext } from "@/lib/functions";
import { themes } from "@/themeContent/themes";
import { usePathname } from "next/navigation";

const LogoIcon = ({ className }: { className: string }) => {
  const { appearance } = useAppearanceContext();
  const theme = appearance?.theme || "standard dark";
  const pathname = usePathname();
  const colors = pathname === "/" ? themes["standard dark"] : themes[theme];

  return (
    <svg
      width="654"
      height="740"
      viewBox="0 0 654 740"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 323.769 0)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 437.47 63.0253)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 551.17 126.051)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 211.186 65)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 324.886 128.025)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 438.587 191.051)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 98.6026 130)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 212.303 193.025)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.87462 0.48481 -0.866025 0.5 326.004 256.051)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 0 200)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 112.583 265)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 225.167 330)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 0 330)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 112.583 395)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 225.167 460)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 0 460)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 112.583 525)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 0.5 0 1 225.167 590)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 341.769 380)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 454.352 315)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 566.936 250)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 341.769 510)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 454.352 445)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 566.936 380)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 341.769 640)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 454.352 575)"
        fill={colors.accentColor}
      />
      <rect
        width="100"
        height="100"
        rx="20"
        transform="matrix(0.866025 -0.5 0 1 566.936 510)"
        fill={colors.accentColor}
      />
    </svg>
  );
};

export default LogoIcon;
