import editBlogWithId from '../../../../../components/api/functions/editBlogWithId';
import deleteBlogWithId from '../../../../../components/api/functions/deleteBlogWithId';
import getBlogWithId from '../../../../../components/api/functions/getBlogWithId';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('jj', req.url.split('/')[5]);
      const blogs = await getBlogWithId({ id: req.url.split('/')[5] });
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  } else if (req.method === 'DELETE') {
    //   remove blog
    try {
      const result = await deleteBlogWithId(req.url.split('/')[5]);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(300).json({ error: { message: error } });
    }
  } else if (req.method === 'POST') {
    //   update blog
    try {
      const result = await editBlogWithId(
        req.url.split('/')[5],
        JSON.parse(req.body)
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(300).json({ error: { message: error } });
    }
  } else {
    res.status(300).json({ message: '404 method not found' });
  }
}
