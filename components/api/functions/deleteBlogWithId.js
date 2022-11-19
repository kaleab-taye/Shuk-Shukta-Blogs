import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
import { userModel } from '../models/user';

export default async function deleteBlogWithId(id) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let blog = await blogModel.findOne({ id: id });
    if (blog === null) {
      throw 'blog not found';
    }
    let author = blog.author._id.toString();
    let blogMongoId = blog._id.toString();

    let response = await blogModel.deleteOne({ id: id });

    // removing blog from referencing author
    let response2 = await userModel.findOne({ _id: author });
    let newBlogs = [];
    await response2.blogs.map((blog) =>
      blog._id.toString() !== blogMongoId ? newBlogs.push(blog) : null
    );
    response2.blogs = newBlogs;
    await response2.save();
    return response;
  } catch (error) {
    throw error;
  }
}
