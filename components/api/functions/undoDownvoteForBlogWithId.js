import mongoose from "mongoose";
import { blogModel } from "../models/blog";

export default async function undoDownvoteForBlogWithId(id) {
    try {
        const mongoDbUrl = process.env.mongoDb_url;
        mongoose.connect(mongoDbUrl);
    
        let blog = await blogModel.findOne({ id: id });
        if (blog === null) {
          throw 'blog not found';
        }
    
        let downVote = parseInt(blog.blogMeta.downVote) - 1;
        blog.blogMeta.downVote = downVote.toString();
    
        blog.overwrite(blog);
        await blog.save();
        return { downVote: 'true' };
      } catch (error) {
        console.error(error);
        throw error;
      }
}
