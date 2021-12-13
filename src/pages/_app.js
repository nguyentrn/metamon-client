import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import store from "../redux/store";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider
      options={{
        staleTime: 0,
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
