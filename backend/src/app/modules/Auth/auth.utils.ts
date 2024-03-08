import jwt, { JwtPayload } from "jsonwebtoken";

export const CreateToken = (
  jwtPayload: { username: string; role?: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret as string) as JwtPayload;
};

export const CreateUserToken = (
  jwtPayload: {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    profileImg: string;
    // verificationID?: string;
    role: string;
    status: string;
    isDeleted: boolean;
    vendor: string;
    cart: string;
    buyedProducts: string[];
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};
