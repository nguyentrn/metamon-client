import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import Main from "./components/Main";
import store from "./redux/store";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ChakraProvider>
  );
}
