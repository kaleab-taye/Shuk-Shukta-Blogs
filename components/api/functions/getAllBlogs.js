import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
export async function getAllBlogs() {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let response =await blogModel.find().lean();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
