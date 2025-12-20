"use client";

import { CustomButton } from "../reusable/customButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignUpModal } from "./modals/signupModal";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastErrorStyles } from "@/themeContent/themes";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../reusable/spinner";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export const SignIn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  return (
    <SignUpModal
      label={
        <CustomButton
          type="accent"
          className={clsx(
            "w-fit px-3 sm:px-4",
            !pathname.startsWith("/app") &&
              "text-background-static bg-foreground-muted-static border-foreground-muted-static"
          )}
        >
          Sign In
        </CustomButton>
      }
      full={true}
    >
      <h2 className="font-bold font-InstrumentSans text-[20px] sm:text-[22px] md:text-[24px]">
        Sign In
      </h2>
      <div className="inline-flex flex-col items-start gap-5">
        <CustomButton
          type="standard"
          className={clsx(
            "gap-5 justify-start",
            !pathname.startsWith("/app")
              ? "text-text-color-static bg-background-muted-static border-foreground-static/80"
              : "text-text-color bg-background-muted border-foreground"
          )}
          onClick={async (e) => {
            e.preventDefault();
            setGoogleLoading(true);
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/app",
              fetchOptions: {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["session"] });
                  sendGAEvent({ event: "sign_in" });
                  router.refresh();
                },
                onError: () => {
                  toast.error("Failed to sign in", {
                    style: toastErrorStyles,
                  });
                },
              },
            });
          }}
        >
          {googleLoading ? <Spinner /> : <FcGoogle />}
          <span>Sign in with Google</span>
        </CustomButton>
        {/* <CustomButton
          type="standard"
          className={clsx(
            "gap-5 justify-start",
            pathname === "/"
              ? "text-text-color-static bg-background-muted-static border-foreground-static/80"
              : "text-text-color bg-background-muted border-foreground"
          )}
        >
          <FaFacebook color="#1877F2" />
          <span>Sign in with Facebook</span>
        </CustomButton> */}
        <CustomButton
          type="standard"
          className={clsx(
            "gap-5 justify-start",
            !pathname.startsWith("/app")
              ? "text-text-color-static bg-background-muted-static border-foreground-static/80"
              : "text-text-color bg-background-muted border-foreground"
          )}
          onClick={async (e) => {
            e.preventDefault();
            setGithubLoading(true);
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/app",
              fetchOptions: {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["session"] });
                  router.refresh();
                },
                onError: () => {
                  toast.error("Failed to sign up", {
                    style: toastErrorStyles,
                  });
                },
              },
            });
          }}
        >
          {githubLoading ? <Spinner /> : <FaGithub />}
          <span>Sign in with Github</span>
        </CustomButton>
      </div>
    </SignUpModal>
  );
};
