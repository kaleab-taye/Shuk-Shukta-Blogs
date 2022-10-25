import mongoose from 'mongoose';
import { blogModel } from '../../models/blog';
import { userModel } from '../../models/user';

export default async function deleteUserWithId(id) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);
  try {
    let user = await userModel.findOne({ id: id });
    if (user === null) {
      throw 'user not found';
    }

    user.userName = 'deleted account';
    user.firstName = 'deleted';
    user.lastName = 'account';
    user.password = 'deleted account';

    user.save();
    //   let author = blog.author._id.toString();
    // let userMongoId = user._id.toString();

    // let response = await user.deleteOne({ id: id });

    // removing user from referencing blogs
    // let response2 = await blogModel.find({ author: userMongoId });

    // console.log('free',response2);
    // let newBlogs = [];
    // response2.map((blog)=>blog.author='')
    // response2.save()
    // await response2.blogs.map((blog) =>
    //   blog._id.toString() !== blogMongoId ? newBlogs.push(blog) : null
    // );
    // response2.blogs = newBlogs;
    // await response2.save();
    return user;
  } catch (error) {
    throw error;
  }
}

// try {
//     let blog = await blogModel.findOne({ id: id });
//     if (blog === null) {
//       throw 'blog not found';
//     }
//     let author = blog.author._id.toString();
//     let blogMongoId = blog._id.toString();

//     let response = await blogModel.deleteOne({ id: id });

//     // removing blog from referencing author
//     let response2 = await userModel.findOne({ _id: author });
//     let newBlogs = [];
//     await response2.blogs.map((blog) =>
//       blog._id.toString() !== blogMongoId ? newBlogs.push(blog) : null
//     );
//     response2.blogs = newBlogs;
//     await response2.save();
//     return response;
//   } catch (error) {
//     throw error;
//   }
