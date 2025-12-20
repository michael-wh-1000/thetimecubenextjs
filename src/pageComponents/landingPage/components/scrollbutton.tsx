"use client";

import { CustomButton } from "@/components/reusable/customButton";

export const ScrollButton = () => {
  return (
    <CustomButton
      type="accent"
      className="w-fit text-background-static bg-foreground-muted-static border-foreground-muted-static"
      onClick={() => {
        const element = document.getElementById("emailInput");
        element?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Nofity Me
    </CustomButton>
  );
};
