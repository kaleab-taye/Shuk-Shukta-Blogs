import deleteBlogWithId from '../../../../components/api/functions/deleteBlogWithId';
import getBlogWithId from '../../../../components/api/functions/getBlogWithId';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blogs = await getBlogWithId(req.query);
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error)
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  }
  else if (req.method === 'DELETE') {
    //   remove blog
    try {
      const key = req.body.key;
      const result = await deleteBlogWithId(req.query.id, key);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(300).json({ error: { message: error } });
    }
  }
  else {
    res.status(300).json({ message: '404 method not found' });
  }
}
