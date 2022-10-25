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
    seen: Number,
    upVote: Number,
    downVote: Number,
    date: { type: Date, default: () => Date.now() },
  },
  author: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
});

export const blogModel =
  Mongoose.models.blog || Mongoose.model('blog', blogSchema);
