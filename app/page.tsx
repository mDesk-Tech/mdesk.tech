"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import LcpOptimizer from "@/components/LcpOptimizer";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("ref") === "miyuki-home"
    ) {
      setShowDialog(true);
    }
  }, []);

  return (
    <div className="bg-background text-foreground">
      <LcpOptimizer />
      <PerformanceOptimizer />

      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>What</AlertDialogTitle>
              <AlertDialogDescription>
                Why so serious? <br /> I thought we were chilling!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
