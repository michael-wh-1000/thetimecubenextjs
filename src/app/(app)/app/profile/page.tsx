import ProfilePage from "@/pageComponents/profilepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | The Time Cube",
};

export default function Profile() {
  return <ProfilePage />;
}
