import logoutUser from "../../../components/api/functions/user/logoutUser";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('gg',req.body)
      const token = typeof(req.body)==='string' ? JSON.parse(req.body) : req.body;
      const resp = await logoutUser(token);
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
