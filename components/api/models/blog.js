import Mongoose from 'mongoose';

const blogSchema = Mongoose.Schema({
  id: { type: String, required: true },
  title: String,
  body: String,
  comment: [
    {
      id: { type: String, required: true },
      by: String,
      comment: String,
    },
  ],
  blogMeta: {
    author: String,
    seen: String,
    upVote: String,
    downVote: String,
    date: String,
  },
});

export const blogModel =
  Mongoose.models.blog || Mongoose.model('blog', blogSchema);
