"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import GlobalReach from "@/components/GlobalReach";
import About from "@/components/About";
import Contact from "@/components/Contact";

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
  const [showDialog, setShowDialog] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("ref") === "miyuki-home"
      );
    }
    return false;
  });

  return (
    <div className="bg-background text-foreground">
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
      <GlobalReach />
      <About />
      <Contact />
    </div>
  );
}
