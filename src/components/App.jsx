import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import useAfterLogin from "../hooks/useAfterLogin";

import Background from "./Background";
import Header from "./Header";

export default function App(props) {
  useAfterLogin();
  return (
    <Flex as="main" flexDir="column" overflow="hidden" w="100vw" h="100vh">
      <Head>
        <link rel="apple-touch÷-icon" sizes="180x180" href="/logo192.png" />
        <link rel="icon" type="image/png" href="/logo192.png" />
        <link rel="mask-icon" href="/logo192.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-signin-client_id"
          content="635333658194-msoha25po8vllive9cbo1bp3abu7pkae.apps.googleusercontent.com"
        />
        <title>Raca Hunter</title>
      </Head>
      <Header />
      <Background />
      <Flex h="calc(100vh - 3rem)" {...props} />
    </Flex>
  );
}
