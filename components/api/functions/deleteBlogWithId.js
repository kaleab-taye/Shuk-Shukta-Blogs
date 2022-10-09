import mongoose from 'mongoose';
import { blogModel } from '../models/blog';

export default async function deleteBlogWithId(id, key) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let blog = await blogModel.findOne({ id: id });
    if (blog === null) {
      throw 'blog not found';
    }
    if (blog.blogKey !== key) {
      throw 'wrong key input';
    }
  } catch (error) {
    throw error;
  }

  try {
    let response = await blogModel.deleteOne({ id: id });
    return response;
  } catch (error) {
    throw error;
  }
}
