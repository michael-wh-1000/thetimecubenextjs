import HomePage from "@/pageComponents/landingPage/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Time Cube | A dynamic time visualizer",
};

export default function Themes() {
  return <HomePage />;
}
