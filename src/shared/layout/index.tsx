import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={`${inter.className} min-h-screen`}>
      <Head>
        <title>Recipi</title>
      </Head>
      <Header></Header>
      <main className="container mx-auto py-5 px-4 md:py-7 md:px-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
