import mongoose from 'mongoose';
import { userModel } from '../../models/user';
export async function editBloggerWithId(id, blogger) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let user = await userModel.findOne({ ...id });
    if (user === null) {
      throw 'no bloggers found';
    }
    if(!blogger.userName || blogger.userName.length<1){
      throw 'username not found'
    }

    user.userName = blogger.userName;
    user.firstName = blogger.firstName;
    user.lastName = blogger.lastName;
    user.password = blogger.password;

    user.save()

    return user;
  } catch (error) {
    console.error(error);
    throw error.toString();
  }
}
