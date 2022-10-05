// const dataBaseLink = process.env.mongoDB;

import  Mongoose  from "mongoose";

// Mongoose.connect(dataBaseLink);

// const blogSchema = Mongoose.Schema({
//     id: { type: String, required: true },
//     content: [
//       {
//         name: String,
//         value: String,
//       },
//     ],
//     postFormatTemplate: { type: String, required: true },
//     createdDate: String,
//     updatedDate: String,
//     publishedOn: [String],
//     publishedInfo: [
//       {
//         connectedPlatformId: String,
//         contentId: String,
//       },
//     ],
//   });
const blogSchema = Mongoose.Schema({
  id: { type: String, required: true },
  title: String,
  body: String,
  comment: [
    { id: String, by: String, comment: String },
    { id: String, by: String, comment: String },
    { id: String, by: String, comment: String },
  ],
  blogMeta: {
    author: String,
    seen: String,
    upVote: String,
    downVote: String,
    date: String,
    comment: String,
  },
});

const blogModel = Mongoose.model('blog', blogSchema);

export { blogModel };
