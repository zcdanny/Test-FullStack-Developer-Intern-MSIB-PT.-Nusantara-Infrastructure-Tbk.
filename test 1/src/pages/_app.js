import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import "@/styles/globals.css";

import { useEffect } from "react";
import Layout from "components/Layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.css");
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
