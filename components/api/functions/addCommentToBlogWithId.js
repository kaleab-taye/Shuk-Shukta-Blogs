import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
import { v4 as uuidV4 } from 'uuid';

export default async function addCommentToBlogWithId(id, comment) {
  try {
    const mongoDbUrl = process.env.mongoDb_url;
    mongoose.connect(mongoDbUrl);

    let blog = await blogModel.findOne({ id: id });

    if (blog === null) {
      throw 'blog not found';
    }

    let newBlog = {
      id:  uuidV4(),
      ...comment
    }
    
    blog.comment.push(newBlog);

    blog.overwrite(blog);
    await blog.save();
    return newBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
