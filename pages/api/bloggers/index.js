import { getAllBloggers } from "../../../components/api/functions/blogger/getAllBloggers";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const bloggers = await getAllBloggers();
      res.status(200).json(bloggers);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  }
  else {
    res.status(300).json({ message: '404 method not found' });
  }

//   else if(req.method === 'POST'){
//     try {
//       const resp = await createNewBlog(req.body);
//       res.status(200).json(resp);
//     } catch (error) {
//       res.status(300).json({
//         error: {
//           message: error.toString(),
//         },
//       });
//     }
//   }

}
