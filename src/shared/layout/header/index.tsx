import React from "react";
import { Pacifico } from "next/font/google";
import ThemeToggler from "@/shared/components/theme-toggler";
import Link from "next/link";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  return (
    <header className="sticky top-0 z-20 shadow-md backdrop-blur-md">
      <div className="container navbar mx-auto">
        <div className="flex-1">
          <Link
            href="/recipes"
            className={`${pacifico.className} btn-ghost btn text-3xl normal-case text-primary`}
          >
            Recipi
          </Link>
        </div>
        <div className="flex-none">
          <ThemeToggler></ThemeToggler>
        </div>
      </div>
    </header>
  );
};

export default Header;
