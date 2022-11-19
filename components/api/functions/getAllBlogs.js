import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
export async function getAllBlogs() {
  
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let blogs = await blogModel.find().lean();
    if (blogs === null || blogs.length === 0) {
      throw 'no blog found';
    }
    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
