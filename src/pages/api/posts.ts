import { NextApiRequest, NextApiResponse } from 'next';

let posts = [
  { id: 1, title: 'First Blog Post', content: 'Content for the first post' },
  { id: 2, title: 'Second Blog Post', content: 'Content for the second post' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all posts
    return res.status(200).json(posts);
  }
  
  if (req.method === 'POST') {
    // Create a new post
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  if (req.method === 'DELETE') {
    // Delete a post by ID
    const { id } = req.query;
    posts = posts.filter((post) => post.id !== Number(id));
    return res.status(200).json({ message: 'Post deleted' });
  }

  // Handle other methods (like PUT) if needed
  return res.status(405).json({ message: 'Method not allowed' });
}
