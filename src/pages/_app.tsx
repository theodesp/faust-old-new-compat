import "faust.config";
import "../../faust.config";

import { FaustProvider as OldFaustProvider } from "@faustjs/next";
import { FaustProvider } from "@faustwp/core";

import "normalize.css/normalize.css";
import React from "react";
import "scss/main.scss";
import { client } from "client";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FaustProvider pageProps={pageProps}>
        <OldFaustProvider client={client} pageProps={pageProps}>
          <Component {...pageProps} />
        </OldFaustProvider>
      </FaustProvider>
    </>
  );
}
