import type { Metadata } from "next";
import AppearancePage from "@/pageComponents/appearancepage";

export const metadata: Metadata = {
  title: "Appearance | The Time Cube",
};

export default function Appearance() {
  return <AppearancePage />;
}
