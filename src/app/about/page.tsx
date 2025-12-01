import AboutPage from "@/pageComponents/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Time Cube",
};

export default function Themes() {
  return <AboutPage />;
}
