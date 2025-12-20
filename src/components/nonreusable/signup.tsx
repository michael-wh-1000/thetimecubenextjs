"use client";

import { useState } from "react";
import { CustomButton } from "../reusable/customButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignUpModal } from "./modals/signupModal";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastErrorStyles } from "@/themeContent/themes";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../reusable/spinner";
import { sendGAEvent } from "@next/third-parties/google";

export const SignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  return (
    <SignUpModal
      label={
        <CustomButton
          type="standard"
          className="justify-center text-text-color-static bg-background-muted-static border-foreground-static/80 w-full sm:w-fit max-w-[400px]"
        >
          Sign Up
        </CustomButton>
      }
      full={true}
    >
      <h2 className="font-bold font-InstrumentSans text-[20px] sm:text-[22px] md:text-[24px]">
        Sign Up
      </h2>
      <div className="inline-flex flex-col items-start gap-5">
        <CustomButton
          type="standard"
          className="gap-5 justify-start text-text-color-static bg-background-muted-static border-foreground-static/80"
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
                  toast.error("Failed to sign up", {
                    style: toastErrorStyles,
                  });
                },
              },
            });
          }}
        >
          {googleLoading ? <Spinner /> : <FcGoogle />}
          <span>Sign up with Google</span>
        </CustomButton>
        {/* <CustomButton
          type="standard"
          className="gap-5 justify-start text-text-color-static bg-background-muted-static border-foreground-static/80"
        >
          <FaFacebook color="#1877F2" />
          <span>Sign up with Facebook</span>
        </CustomButton> */}
        <CustomButton
          type="standard"
          className="gap-5 justify-start text-text-color-static bg-background-muted-static border-foreground-static/80"
          onClick={async (e) => {
            e.preventDefault();
            setGithubLoading(true);
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/app",
              fetchOptions: {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["session"] });
                  router.push("/app");
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
          <span>Sign up with Github</span>
        </CustomButton>
      </div>
    </SignUpModal>
  );
};
