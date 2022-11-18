import Mongoose from 'mongoose';

const commentSchema = Mongoose.Schema({
  id: { type: String, required: true },
  body: String,
  from: {type: Mongoose.Schema.Types.ObjectId, ref: 'user'},
  forBlog: {type: Mongoose.Schema.Types.ObjectId, ref: 'blog'},
  date: String,
  like: Number,
  replay: [
    {
      id: String,
      from: String,
      date: String,
      body: String,
    },
  ],
});

export const commentModel =
  Mongoose.models.comment || Mongoose.model('comment', commentSchema);
