"use client";
import React from "react";
import Hero from "../components/pages/landing-page/Hero";
import Waitlist from "../components/pages/landing-page/Waitlist";
import Partners from "../components/pages/landing-page/Partners";
import PathToSuccess from "../components/pages/landing-page/PathToSuccess";
import BecomeMentor from "../components/pages/landing-page/BecomeMentor";
import FAQ from "@/components/pages/landing-page/FAQ";

export default function App() {
  return (
    <div className="bg-background">
      <main>
        <Hero />
        <Waitlist />
        <Partners />
        <PathToSuccess />
        <BecomeMentor />
        <FAQ />
      </main>
    </div>
  );
}
