import { useSession } from "next-auth/react";
import { Flex, Button, Text, Input, Badge, Icon } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

import { selectAddresses } from "../../../redux/authSlice";
import {
  loginGame,
  removeAddress,
  selectGameErr,
  selectIsLoadingGame,
} from "../../../redux/gameSlice";

// const defaultData = {
//   address: "0x04D8BA1E71b967DE73760967013969fB66a0Ee8E",
//   sign: "0x24da17893a288d134c1025ca9b2c2368663beebb45b371b726780bcf608e7d1738288c49ad7c5af3da2f91bc7379934b8f67c020af8c5c9b654d1538bae4454f1c",
//   msg: "LogIn-4c1d2ebe-d9dc-74db-a6b0-12994987da09",
// };

const AddressSubmit = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const isLoading = useSelector(selectIsLoadingGame);
  const err = useSelector(selectGameErr);
  const addresses = useSelector(selectAddresses);

  const handleLogin = (data) => {
    dispatch(loginGame(data));
  };

  const handleRemove = (addressId) => {
    dispatch(removeAddress(addressId));
  };

  return (
    <Flex
      flexDir="column"
      bg="whiteAlpha.900"
      m="auto"
      p="10"
      borderRadius="2xl"
      w="32rem"
    >
      {addresses && (
        <Flex flexDir="column">
          <Text mx="auto" mb="2" fontSize="xl">
            Địa chỉ đã lưu
          </Text>
          {addresses.map((address) => (
            <Flex my="1" key={address.address} justify="space-between">
              <Badge cursor="pointer" onClick={() => handleLogin(address)}>
                {address.address}
              </Badge>
              <Icon
                as={AiOutlineClose}
                cursor="pointer"
                onClick={() => handleRemove(address.address)}
              />
            </Flex>
          ))}
        </Flex>
      )}
      <Flex
        mt="8"
        as="form"
        flexDir="column"
        w="100%"
        justify="space-between"
        onSubmit={handleSubmit(handleLogin)}
      >
        <Text mx="auto" mb="2" fontSize="xl">
          Địa chỉ mới
        </Text>
        <Input
          placeholder="address"
          size="sm"
          my="1"
          {...register("address", {
            required: "Please enter address.",
          })}
        />
        <Input
          placeholder="sign"
          size="sm"
          my="1"
          {...register("sign", { required: "Please enter sign." })}
        />
        <Input
          placeholder="msg"
          size="sm"
          my="1"
          {...register("msg", { required: "Please enter msg." })}
        />

        <Button
          size="lg"
          mt="4"
          type="submit"
          colorScheme="orange"
          alignSelf="center"
          isLoading={isLoading}
        >
          Truy cập
        </Button>
        {!session ? (
          <Text my="1" fontSize="xs" textAlign="center" color="red.500">
            Vui lòng đăng nhập để ghi nhớ dữ liệu !
          </Text>
        ) : (
          ""
        )}
        {err ? (
          <Text textAlign="center" color="red.500">
            {err}
          </Text>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default AddressSubmit;
