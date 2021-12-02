import { Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectErr, selectIsLoading } from '../redux/authSlice';
import Container from './Container';

const Login = () => {
  const isLoading = useSelector(selectIsLoading);
  const err = useSelector(selectErr);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    // dispatch(login());
  }, [dispatch]);

  return (
    <Container
      align="center"
      justify="center"
      flexDir="column"
      color="whiteAlpha.900"
    >
      <Button
        size="lg"
        colorScheme="orange"
        onClick={handleLogin}
        isLoading={isLoading}
      >
        Đăng nhập
      </Button>
      {isLoading ? (
        <Text>
          Vui lòng đăng nhập Metamask và nhấn Enter Game trong trình duyệt !
        </Text>
      ) : (
        ''
      )}
      {err ? <Text>{err}</Text> : ''}
    </Container>
  );
};

export default Login;
