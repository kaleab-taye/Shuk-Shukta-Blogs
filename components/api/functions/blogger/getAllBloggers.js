import mongoose from 'mongoose';
import { userModel } from '../../models/user';
export async function getAllBloggers() {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let users = await userModel.find().lean();
    if (users === null || users.length === 0) {
      throw 'no bloggers found';
    }
    let bloggers = users.filter((user) => user.blogs.length > 0);
    return bloggers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
