import mongoose from 'mongoose';
import { tokenModel } from '../../models/token';

export default async function logoutUser(token) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);
  try {
    // content validation
    token = typeof token === 'string' ? JSON.parse(token) : token;
    // console.log('tt', token);
    if (!token.token) {
      throw 'id not specified';
    }

    let foundUser = await tokenModel.findOne({ token: token.token });

    if (foundUser === null) {
      return { logout: true };
    } else {
      let resp = await tokenModel.deleteOne({ token: token.token });
      return { logout: true };
    }
  } catch (error) {
    console.error(error);
    throw `failed to logout ${error}`;
  }
}
