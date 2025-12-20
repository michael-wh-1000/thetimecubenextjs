"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { Input } from "@/components/ui/input";
import { addToWaitlist } from "@/lib/server";
import { emailSchema } from "@/lib/types";
import { toastErrorStyles, toastSuccessStyles } from "@/themeContent/themes";
import { useState } from "react";
import { toast } from "sonner";
import { sendGAEvent } from "@next/third-parties/google";

export const EmailWaitlist = () => {
  const [email, setEmail] = useState("");

  const submitEmail = async () => {
    const trimmedEmail = email.trim();

    const result = emailSchema.safeParse(trimmedEmail);

    if (result.success) {
      const serverResult = await addToWaitlist(trimmedEmail);

      if (serverResult?.error) {
        toast.error("Network error", {
          style: toastErrorStyles,
        });
      } else {
        toast.success("Added to waitlist", {
          style: toastSuccessStyles,
        });
        sendGAEvent({ event: "waitlist_success" });
      }
    }
  };
  return (
    <>
      <Input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="py-4 pr-8 sm:py-5 sm:pr-10 border-foreground-static border rounded-md w-full max-w-[400px] text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted-static"
      />
      <CustomButton
        type="accent"
        onClick={submitEmail}
        className="w-fit text-background-static bg-foreground-muted-static border-foreground-muted-static"
      >
        Submit
      </CustomButton>
    </>
  );
};
