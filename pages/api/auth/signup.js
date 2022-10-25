import NextCors from 'nextjs-cors';
import { createNewUser } from '../../../components/api/functions/user/createNewUser';

export default async function handler(req, res) {
  
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST') {
    try {
      const resp = await createNewUser(req.body);
      const user = JSON.parse(req.body);
      if (!user.userName) {
        throw 'username not specified';
      } else if (!user.firstName) {
        throw 'first name not specified';
      } else if (!user.lastName) {
        throw 'last name not specified';
      } else if (!user.password) {
        throw 'password not specified';
      }
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
