import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;

/*
CODE EXPLANATION: 
This code exports an Express Router that defines two routes:

    GET /: Queries all posts from the MongoDB database (via the Post model) and returns the data in a JSON 
    response with success status code (200). In case of an error, a failure status code (500) and a message are returned.

    POST /: Accepts data (name, prompt, photo) from a request body, uploads the photo to Cloudinary, creates a new post 
    in the MongoDB database (via the Post model), and returns the created post data in a JSON response with success status code (200). 
    In case of an error, a failure status code (500) and a message are returned.

This router uses environment variables (from a .env file) to configure the Cloudinary instance.
*/
