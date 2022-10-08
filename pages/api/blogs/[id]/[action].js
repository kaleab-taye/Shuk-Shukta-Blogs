import addCommentToBlogWithId from '../../../../components/api/functions/addCommentToBlogWithId';
import addSeenToBlogWithId from '../../../../components/api/functions/addSeenToBlogWithId';
import checkBlogKey from '../../../../components/api/functions/checkBlogKey';
import downVoteBlogWithId from '../../../../components/api/functions/downVoteBlogWithId';
import upVoteBlogWithId from '../../../../components/api/functions/upVoteBlogWithId';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // up vote a blog
      if (req.query.action === 'upvote') {
        const result = await upVoteBlogWithId(req.query.id);
        res.status(200).json(result);
      }
      //   down vote
      else if (req.query.action === 'downvote') {
        const result = await downVoteBlogWithId(req.query.id);
        res.status(200).json(result);
      }
      //   comment
      else if (req.query.action === 'comment') {
        let comment = req.body;
        const result = await addCommentToBlogWithId(req.query.id, comment);
        res.status(200).json(result);
      }
      //   seen
      else if (req.query.action === 'seen') {
        const result = await addSeenToBlogWithId(req.query.id);
        res.status(200).json(result);
      }
      //   blog key check
      else if (req.query.action === 'key') {
        let key = req.body
        const result = await checkBlogKey(req.query.id,key);
        res.status(200).json(result);
      }

      // failing condition
      else {
        throw 'action not found';
      }
    } catch (error) {
      res.status(300).json({
        action: req.query.action,
        success: 'false',
        error: {
          message: error.toString(),
        },
      });
    }
  }else {
    throw '404 method not found'
  }
}
