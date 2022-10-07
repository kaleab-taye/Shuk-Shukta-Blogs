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

    blog.comment.push({
      id: uuidV4(),
      ...comment,
    });

    blog.overwrite(blog);
    await blog.save();
    console.log(blog);
    return { comment: blog.comment };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
