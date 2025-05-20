"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { FileText, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </motion.div>
          <span className="font-bold text-xl">AI Resume Reviewer</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                className={
                  pathname === "/" ? "bg-primary/90 hover:bg-primary/80" : ""
                }
              >
                Home
              </Button>
            </Link>
            <Link href="/review">
              <Button
                variant={pathname === "/review" ? "default" : "ghost"}
                className={
                  pathname === "/review"
                    ? "bg-primary/90 hover:bg-primary/80"
                    : ""
                }
              >
                Review
              </Button>
            </Link>
          </nav>

          <ModeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={pathname === "/" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === "/"
                        ? "bg-primary/90 hover:bg-primary/80"
                        : ""
                    }`}
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/review" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={pathname === "/review" ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === "/review"
                        ? "bg-primary/90 hover:bg-primary/80"
                        : ""
                    }`}
                  >
                    Review
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
