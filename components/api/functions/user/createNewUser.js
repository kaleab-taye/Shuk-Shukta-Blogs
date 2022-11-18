import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { userModel } from '../../models/user';

export async function createNewUser(user) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    // console.log('dd', user);
    const signingUser = {
      ...JSON.parse(user),
      id: uuidV4(),
      joinedDate: Date.now(),
    };
    let response = await userModel.create(signingUser);
    console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
