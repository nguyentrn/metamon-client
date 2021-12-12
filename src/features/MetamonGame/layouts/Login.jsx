import { Flex, Button, Text, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login, selectErr, selectIsLoading } from "../../../redux/authSlice";
import Container from "../../../components/Container";

// const defaultData = {
//   address: "0x04D8BA1E71b967DE73760967013969fB66a0Ee8E",
//   sign: "0x79c5949454d23c815b1a3866a8c554872ae46aa9910a32c36a386b610b8c370e644fabc43b401264aa265654f3fc62275111baf830106a67075d96c0a64916a91b",
//   msg: "LogIn-80cfaf86-d136-175e-44c3-ca0829b724ec",
// };

const Login = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const isLoading = useSelector(selectIsLoading);
  const err = useSelector(selectErr);
  const dispatch = useDispatch();
  const handleLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <Container
      align="center"
      justify="center"
      flexDir="column"
      color="blackAlpha.900"
    >
      <Flex
        as="form"
        flexDir="column"
        borderRadius="2xl"
        w="32rem"
        justify="space-between"
        bg="whiteAlpha.900"
        p="10"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Input
          placeholder="address"
          my="1"
          {...register("address", {
            required: "Please enter your first name.",
          })}
        />
        <Input
          placeholder="sign"
          my="1"
          {...register("sign", { required: "Please enter your first name." })}
        />
        <Input
          placeholder="msg"
          my="1"
          {...register("msg", { required: "Please enter your first name." })}
        />
        <Button
          size="lg"
          m="1"
          type="submit"
          colorScheme="orange"
          isLoading={isLoading}
        >
          Đăng nhập
        </Button>
        {err ? (
          <Text textAlign="center" color="red.500">
            {err}
          </Text>
        ) : (
          ""
        )}
      </Flex>
    </Container>
  );
};

export default Login;
