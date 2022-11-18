import mongoose from 'mongoose';
import { userModel } from '../../models/user';
import * as jose from 'jose';
import { tokenModel } from '../../models/token';

export async function findUser(user) {
  const mongoDbUrl = process.env.mongoDb_url;
  const jwtAccessToken = process.env.jwtAccessToken;
  const jwtRevalidateAccessToken = process.env.jwtRevalidateAccessToken;
  mongoose.connect(mongoDbUrl);
  try {
    // content validation
    if (!user.userName) {
      throw 'username not specified';
    } else if (!user.password) {
      throw 'password not specified';
    }

    let foundUser = await userModel.findOne({ userName: user.userName });
    if (foundUser === null) {
      throw `can't find user with username ${user.userName}`;
    } else if (foundUser.password !== user.password) {
      throw 'wrong password used';
    } else {
      try {
        // access token
        const secret = new TextEncoder().encode(jwtAccessToken);
        const loginAccessToken = await new jose.SignJWT({
          ...foundUser,
        })
          .setProtectedHeader({ alg: 'HS256' })
          .sign(secret);
        // revalidate token
        const revalidateSecret = new TextEncoder().encode(
          jwtRevalidateAccessToken
        );
        const revalidateAccessToken = await new jose.SignJWT({
          ...foundUser,
        })
          .setProtectedHeader({ alg: 'HS256' })
          .sign(revalidateSecret);
        try {
          tokenModel.create({
            userId: foundUser.id,
            token: revalidateAccessToken,
          });
        } catch (error) {
          throw `revalidate token couldn't be stored ${error}`;
        }

        return {
          accessToken: loginAccessToken,
          revalidateAccessToken: revalidateAccessToken,
          user: foundUser,
        };
      } catch (error) {
        throw `error creating a token ${error}`;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
