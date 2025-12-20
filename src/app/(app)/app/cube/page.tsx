import CubePage from "@/pageComponents/cubepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Time Cube | A dynamic time visualizer",
};

export default function Cube() {
  return <CubePage />;
}
