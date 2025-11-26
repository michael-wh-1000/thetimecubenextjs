import type { Metadata } from "next";
import ThemePage from "@/pageComponents/themepage";

export const metadata: Metadata = {
  title: "Themes | The Time Cube",
};

export default function Themes() {
  return <ThemePage />;
}
