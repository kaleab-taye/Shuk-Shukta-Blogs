import mongoose from "mongoose"
import { blogModel } from "../models/blog"

export default async function getBlogWithId({id}) {

    let mongoDb_url = process.env.mongoDb_url
    mongoose.connect(mongoDb_url)

  try {
    let response = await blogModel.findOne({id : id});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
