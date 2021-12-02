import { Flex } from '@chakra-ui/layout';

const Container = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Flex flexDir="column" w="100vw" h="100vh" {...props} />;
};

export default Container;
