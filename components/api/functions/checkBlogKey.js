import mongoose from 'mongoose';
import { blogModel } from '../models/blog';

export default async function checkBlogKey(id,key) {
  try {
    const mongoDbUrl = process.env.mongoDb_url;
    mongoose.connect(mongoDbUrl);

    let blog = await blogModel.findOne({ id: id });
    if (blog === null) {
      throw 'blog not found';
    }
    if(blog.blogKey===key.blogKey){

        return { key: 'pass' };
    }
    else{
        throw "key doesn't match";
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
