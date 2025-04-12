import { useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";

import "styles/fonts.css";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            retry: 0,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>Ant Engineer</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Ant Engineer is a platform created by Nguyen Hong Tan, sharing valuable knowledge on the latest technologies, tutorials, and industry trends. Empowering developers and tech enthusiasts with in-depth resources and guides."
        />
        <meta
          name="keywords"
          content="technology, tutorials, developer resources, AI, software engineering, tech news, programming, web development, innovation"
        />
        <meta name="author" content="Nguyen Hong Tan" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/drnqf7lrb/image/upload/v1744451354/d4h0oecbsqux4ko23f49.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-dracula.min.css"
        />
        <meta
          name="description"
          content="Ant Engineer is a platform created by Nguyen Hong Tan, sharing valuable knowledge on the latest technologies, tutorials, and industry trends. Empowering developers and tech enthusiasts with in-depth resources and guides."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ant-engineer.vercel.app/" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
