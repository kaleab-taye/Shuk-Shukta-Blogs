import getBlogWithId from '../../../../components/api/functions/getBlogWithId';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blogs = await getBlogWithId(req.query);
      console.log(blogs)
      res.status(200).json(blogs);
    } catch (error) {
      console.log('eee',error)
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  }
}
