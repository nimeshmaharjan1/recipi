import "../styles/globals.scss";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ThemeProvider } from "next-themes";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import NextNProgress from "nextjs-progressbar";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: { initialSession: Session };
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <SessionProvider session={session}> */}
      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      <NextNProgress
        options={{ showSpinner: false }}
        showOnShallow
        height={4}
      />
      {/* </SessionProvider> */}
    </QueryClientProvider>
  );
}
