import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
import { v4 as uuidV4 } from 'uuid';

export async function createNewBlog(blog) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  let date = new Date();
  try {
    let newBlog = {
      id: uuidV4(),
      ...blog,
    };

    newBlog.blogMeta.date = Date.now();

    let response = await blogModel.create(newBlog);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
