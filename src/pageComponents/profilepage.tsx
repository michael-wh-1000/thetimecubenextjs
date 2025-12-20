"use client";

import { CustomButton } from "@/components/reusable/customButton";
import { Input } from "@/components/ui/input";
import { SessionContext } from "@/lib/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import clsx from "clsx";
import { DeleteModal } from "@/components/nonreusable/modals/deleteModal";
import { toastErrorStyles, toastSuccessStyles } from "@/themeContent/themes";
import { userNameSchema } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/reusable/spinner";

const ProfilePage = () => {
  const router = useRouter();
  const session = useContext(SessionContext);
  const [draft, setDraft] = useState(session?.user.name);
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const startEditing = () => {
    setDraft(session?.user.name);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(session?.user.name);
    setIsEditing(false);
  };

  const submit = async () => {
    if (draft && draft !== session?.user.name) {
      const zodResult = userNameSchema.safeParse(draft.trim());

      if (zodResult.success) {
        const result = await authClient.updateUser({
          name: draft.trim(),
        });

        if (result.error) {
          toast.error("Failed to update username", {
            style: toastErrorStyles,
          });
        } else {
          toast.success("Username updated", {
            style: toastSuccessStyles,
          });
        }
      } else {
        setDraft(session?.user.name);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    if (e.key === "Escape") cancelEditing();
  };

  useEffect(() => {
    if (isEditing) {
      nameInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <main className="py-20 sm:py-[100px] flex flex-col gap-5 sm:gap-[25px] md:gap-[30px] lg:gap-[35px] px-5 sm:px-[100px] bg-background text-text-color w-full max-w-[2000px] animate-on-load">
        <section className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 ">
          <div className="w-full flex items-start justify-between  gap-5">
            <CustomButton
              type="standard"
              className="w-auto p-2"
              onClick={() => router.back()}
            >
              <IoChevronBackOutline />
            </CustomButton>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[21px]  font-semibold">
              Username
            </h3>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <div className="px-4 sm:px-5 h-9 border-background-muted border rounded-md w-full min-w-0 max-w-[400px] text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted flex items-center">
                    <span className="line-clamp-1 word-break hyphens-auto">
                      {session?.user.name}
                    </span>
                  </div>
                  <CustomButton
                    onClick={startEditing}
                    type="accent"
                    className="w-fit px-3"
                  >
                    <FaPen size={12} />
                  </CustomButton>
                </>
              ) : (
                <>
                  <Input
                    ref={nameInputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="px-4 sm:px-5 border-foreground border rounded-md w-full max-w-[400px] text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted"
                  />
                  <CustomButton
                    onClick={submit}
                    type="accent"
                    className="w-fit px-3"
                  >
                    <FaCheck size={12} />
                  </CustomButton>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[21px]  font-semibold">
              Email
            </h3>

            <div className="px-4 sm:px-5 h-9 border-background-muted border rounded-md w-full min-w-0 max-w-[400px] text-[14px] sm:text-[15px] md:text-[16px] bg-background-muted flex items-center">
              <span className="line-clamp-1 word-break hyphens-auto">
                {session?.user.email}
              </span>
            </div>

            <CustomButton
              type="accent"
              className={clsx(
                "w-full max-w-[400px] px-3 sm:px-4 justify-center"
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
                  },
                });
              }}
            >
              {loading && <Spinner />}
              Sign Out
            </CustomButton>
          </div>
          <div className="flex flex-col w-full max-w-[400px] gap-2">
            <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[21px]  font-semibold">
              Danger Zone
            </h3>

            <DeleteModal
              label={"Delete Account"}
              icon={<></>}
              type="user"
              buttonType="warning"
              className="justify-center"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
