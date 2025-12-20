"use client";

import { CustomButton } from "../reusable/customButton";
import clsx from "clsx";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastErrorStyles } from "@/themeContent/themes";
import { useQueryClient } from "@tanstack/react-query";

export const SignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <CustomButton
      type="accent"
      className={clsx(
        "w-full text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] px-3 sm:px-4 justify-center"
      )}
      onClick={async (e) => {
        e.preventDefault();
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
      Sign Out
    </CustomButton>
  );
};
