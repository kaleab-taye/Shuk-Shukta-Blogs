import mongoose from 'mongoose';
import { blogModel } from '../models/blog';

export default async function editBlogWithId(id, newBlog) {
  try {
    const mongoDbUrl = process.env.mongoDb_url;
    mongoose.connect(mongoDbUrl);

    let blog = await blogModel.findOne({ id: id });
    if (blog === null) {
      throw 'blog not found';
    }
    let updatedBlog = { ...blog._doc, ...newBlog };
    blog.overwrite(updatedBlog);
    await blog.save();
    return updatedBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
