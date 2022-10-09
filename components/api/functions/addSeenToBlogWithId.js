import mongoose from "mongoose";
import { blogModel } from "../models/blog";

export default async function addSeenToBlogWithId(id) {
    try {
        const mongoDbUrl = process.env.mongoDb_url;
        mongoose.connect(mongoDbUrl);
    
        let blog = await blogModel.findOne({ id: id });
        if (blog === null) {
          throw 'blog not found';
        }
    
        let newSeen = parseInt(blog.blogMeta.seen) + 1;
        blog.blogMeta.seen = newSeen.toString();
    
        blog.overwrite(blog);
        await blog.save();
        return { seen: 'true' };
      } catch (error) {
        console.error(error);
        throw error;
      }
}
