import mongoose from 'mongoose';
import { blogModel } from '../models/blog';
import {v4 as uuidV4} from 'uuid';


export async function createNewBlog(blog) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let response =await blogModel.create({
        id : uuidV4(),
        ... blog

    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
