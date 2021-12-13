import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req) => {
  const decode = await getToken({ req, secret });
  return decode;
};
