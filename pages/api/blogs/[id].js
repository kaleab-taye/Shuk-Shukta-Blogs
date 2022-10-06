import mongoose from "mongoose";
import getBlogWithId from "../../../components/api/functions/getBlogWithId";
import { blogModel } from "../../../components/api/models/blog";

export default async function handler(req, res) {

  try {
    
    const blogs = await getBlogWithId(req.query);
    console.log(blogs)
    res.status(200).json(blogs);
  } catch (error) {

    res.status(300).json({
      error : {
        message : error
      }
    })
  }

}

