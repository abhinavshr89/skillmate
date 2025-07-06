import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="grid-background"></div>
      <HeroSection />
    </div>
  );
}
