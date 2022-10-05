import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
export async function getAllBlogs(req, res) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let response =await blogModel.find().lean();
    console.log('k1',response)
    return response;
  } catch (error) {
    console.log('k2');
    return error;
  }
}
