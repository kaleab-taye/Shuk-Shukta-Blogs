import { getBloggerWithId } from '../../../../components/api/functions/blogger/getBloggerWithId';
import { editBloggerWithId } from '../../../../components/api/functions/blogger/editBloggerWithId';
import deleteUserWithId from '../../../../components/api/functions/user/deleteUserWithId';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blogger = await getBloggerWithId(req.query);
      res.status(200).json(blogger);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  } else if (req.method === 'POST') {
    try {
      // console.log(req.query)
      const blogger = await editBloggerWithId(req.query, req.body);
      res.status(200).json(blogger);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await deleteUserWithId(req.url.split('/')[3]);
      res.status(200).json(response);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  } else {
    res.status(300).json({ message: '404 method not found' });
  }
}
