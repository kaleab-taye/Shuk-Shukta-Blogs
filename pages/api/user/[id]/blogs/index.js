import getBlogsFromUserId from '../../../../../components/api/functions/user/getBlogsFromUserId';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // console.log('chochi',req)
      // console.log('param',req.url.split('/')[3])
      const blogs = await getBlogsFromUserId(req.url.split('/')[3]);
      //   const params = Url.parse(req.url);
      //   console.log('rerrr',params.id)
      //   const blogs = await getBlogsFromUserId(params.id);
      res.status(200).json(blogs);
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
