import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Flex, Button, Text } from "@chakra-ui/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session } = useSession();
  return (
    <Flex
      as="header"
      minH="3rem"
      maxH="3rem"
      align="center"
      justify="space-between"
      color="whiteAlpha.900"
      px="4"
    >
      <Flex>
        <Link href="/">
          <Button size="sm" colorScheme="orange" mx="1">
            Home
          </Button>
        </Link>
        <Link href="/skyeye">
          <Button size="sm" colorScheme="orange" mx="1">
            SkyEye
          </Button>
        </Link>
        <Link href="/game">
          <Button size="sm" colorScheme="orange" mx="1">
            MetamonAuto
          </Button>
        </Link>
      </Flex>
      <Flex align="center">
        {!session && (
          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => signIn("google")}
          >
            Đăng nhập
          </Button>
        )}
        {session && (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
              />
            )}
            <Text fontWeight="600" fontSize="xs" mx="1">
              {session.user.email || session.user.name}
            </Text>
            <Link href="/profile" mx="1">
              <Button size="sm" colorScheme="green">
                Tài khoản
              </Button>
            </Link>
            <Button
              mx="1"
              size="sm"
              colorScheme="orange"
              onClick={() => signOut("google")}
            >
              Đăng xuất
            </Button>

            {/* <Link href="/auth/signout">
            <Button size="sm" colorScheme="orange" m="1">
              Đăng xuất
            </Button>
          </Link> */}
          </>
        )}
      </Flex>
    </Flex>
  );
}
