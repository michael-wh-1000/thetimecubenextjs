"use client";

import { CustomButton } from "../reusable/customButton";
import clsx from "clsx";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastErrorStyles } from "@/themeContent/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Spinner from "../reusable/spinner";

export const SignOut = ({ className }: { className?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  return (
    <CustomButton
      type="accent"
      className={clsx(
        "w-full px-3 sm:px-4 justify-center",
        className
          ? className
          : "text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
      )}
      onClick={async (e) => {
        e.preventDefault();
        setLoading(true);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["session"] });
              router.push("/app");
              router.refresh();
            },
            onError: () => {
              toast.error("Failed to sign out", {
                style: toastErrorStyles,
              });
            },
          },
        });
      }}
    >
      {loading && <Spinner />}
      Sign Out
    </CustomButton>
  );
};
