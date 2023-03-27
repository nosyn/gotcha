import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const secret = 'EVgvm1QZNTebgmhMmRP9liPd5P4VTxnG';
const signOptions: SignOptions = {
  expiresIn: '1d',
  issuer: 'gotcha-issuer',
  audience: 'gotcha-audience',
};

const verifyOptions: SignOptions = {
  expiresIn: '1d',
  issuer: 'gotcha-issuer',
  audience: 'gotcha-audience',
};

export const signJWT = (payload: Object) => jwt.sign(payload, secret, signOptions);

export const generateSession = (payload: Object) => ({ jwt: jwt.sign(payload, secret, signOptions) });

export const verifyJWT = (token: string) => jwt.verify(token, secret, verifyOptions);

export const decodeJWT = (token: string) => jwt.decode(token);

const { JsonWebTokenError, TokenExpiredError } = jwt;
export { JsonWebTokenError, TokenExpiredError };
