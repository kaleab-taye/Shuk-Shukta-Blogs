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
    if (!blogger.userName || blogger.userName.length < 1) {
      throw 'username not found';
    }
    
    const newUser = {
      ...user._doc,
      ...blogger,
    };
;
    user.overwrite(newUser);
    await user.save();
    return user;
  } catch (error) {
    console.error(error);
    throw error.toString();
  }
}
