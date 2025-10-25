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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const showDialog = params.ref === "miyuki-home";

  return (
    <div className="bg-background text-foreground">
      {showDialog && (
        <AlertDialog open={showDialog}>
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
