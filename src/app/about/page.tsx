import AboutPage from "@/pageComponents/about";
import CubePage from "@/pageComponents/cubepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Time Cube",
};

export default function Themes() {
  return <AboutPage />;
}
