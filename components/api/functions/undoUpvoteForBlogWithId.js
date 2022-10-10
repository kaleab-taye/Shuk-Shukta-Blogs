import mongoose from "mongoose";
import { blogModel } from "../models/blog";

export default async function undoUpvoteForBlogWithId(id) {
    try {
        const mongoDbUrl = process.env.mongoDb_url;
        mongoose.connect(mongoDbUrl);
    
        let blog = await blogModel.findOne({ id: id });
        if (blog === null) {
          throw 'blog not found';
        }
    
        let upVote = parseInt(blog.blogMeta.upVote) - 1;
        blog.blogMeta.upVote = upVote.toString();
    
        blog.overwrite(blog);
        await blog.save();
        return { undoUpVote: 'true' };
      } catch (error) {
        console.error(error);
        throw error;
      }

}
