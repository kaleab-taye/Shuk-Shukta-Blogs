import mongoose from 'mongoose';
import getBlogWithId from '../../../../components/api/functions/getBlogWithId';
import { blogModel } from '../../../../components/api/models/blog';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const blogs = await getBlogWithId(req.query);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(300).json({
        error: {
          message: error.toString(),
        },
      });
    }
  }
}
