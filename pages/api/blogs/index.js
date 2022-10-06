import { createNewBlog } from '../../../components/api/functions/createNewBlog';
import { getAllBlogs } from '../../../components/api/functions/getAllBlogs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blogs = await getAllBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error,
        },
      });
    }
  }
  else if(req.method === 'POST'){
    try {
      const resp = await createNewBlog(req.body);
      res.status(200).json(resp);
    } catch (error) {
      res.status(300).json({

        error: {
          message: error,
        },
      });
    }
  }
}
