import { Flex } from "@chakra-ui/react";
import App from "../../components/App";

import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <App align="center">
      <Flex bg="whiteAlpha.900">
        <div>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      </Flex>
    </App>
  );
};

export default SignIn;
