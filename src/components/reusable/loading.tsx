import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <Bouncy size="70" speed="1.75" color="#353535" />
    </div>
  );
}
