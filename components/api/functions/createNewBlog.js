import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
import { v4 as uuidV4 } from 'uuid';
import { userModel } from '../models/user';

export async function createNewBlog(blog) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let newBlog = {
      id: uuidV4(),
      ...blog,
    };

    newBlog.blogMeta.date = Date.now();

    let response = await blogModel.create(newBlog);

    let user = await userModel.findOne({ _id: blog.author });
// console.log('__id',(response._id).toString())
    user.blogs.push((response._id).toString());
    user.save();

    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
