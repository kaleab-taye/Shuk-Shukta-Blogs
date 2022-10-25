import { findUser } from '../../../components/api/functions/user/loginUser';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const user = JSON.parse(req.body) ? JSON.parse(req.body) : req.body;

      const resp = await findUser(user);
      res.status(200).json(resp);
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
