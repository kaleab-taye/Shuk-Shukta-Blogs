import editBlogWithId from '../../../../components/api/functions/editBlogWithId';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const blogs = await editBlogWithId(req.query.id, req.body);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  } else {
    res.status(300).json({
      error: {
        message: 'method not found',
      },
    });
  }
}
