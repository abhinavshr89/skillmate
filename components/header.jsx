import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full border-b bg-background opacity-80  backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between ">
        <Link href="/">
        <div className="flex items-center space-x-2 flex-row-reverse gap-2">
          <h1 className=" max-sm:hidden font-poppins font-semibold custom-gradient text-[30px] ">
            SkillMate AI
          </h1>
          <Image alt="header-icon" width={30} height={30} src={"/img.jpg"} className=""/>
         
        </div>

        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href={"/onboarding"}>
              <Button>
                <LayoutDashboard className="h-4 w-4" />
                <span className="max-md:hidden">Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center space-x-2"
                  >
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/interview"
                    className="flex items-center space-x-2"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          {/* -------------------------- */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
