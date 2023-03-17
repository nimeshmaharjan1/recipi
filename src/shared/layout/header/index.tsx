import React from "react";
import { Pacifico } from "next/font/google";
import ThemeToggler from "@/shared/components/theme-toggler";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  return (
    <header className="bg-base-200 shadow">
      <div className="container navbar mx-auto">
        <div className="flex-1">
          <a
            className={`${pacifico.className} btn-ghost btn text-3xl normal-case text-primary`}
          >
            Recipi
          </a>
        </div>
        <div className="flex-none">
          <ThemeToggler></ThemeToggler>
        </div>
      </div>
    </header>
  );
};

export default Header;
