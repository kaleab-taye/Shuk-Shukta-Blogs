import mongoose from 'mongoose';
import { userModel } from '../../models/user';

export default async function getBlogsFromUserId(id) {
  try {
    let mongoDb_url = process.env.mongoDb_url;
    mongoose.connect(mongoDb_url);

    let user = await userModel.findOne({ id: id }).populate({
      path: 'blogs',
      populate: {
        path: '_id',
        model: 'blog',
      }
    });

    if (user === null) {
      throw 'user not found';
    }
    // console.log('chalchi',user)
    let blogs = []
    user.blogs.map((blog)=>blogs.push(blog._id))
    return blogs;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// .populate('blogs');
