import React from 'react';
import Link from 'next/link';
import { usePostContext } from '../context/PostContext';

export const getStaticProps = async () => {
  const staticPosts = [
    { id: 1, title: 'First Blog Post', excerpt: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog Post', excerpt: 'This is the second blog post.' },
  ];

  return {
    props: { staticPosts },
  };
};

const HomePage: React.FC<{ staticPosts: { id: number; title: string; excerpt: string }[] }> = ({ staticPosts }) => {
  const { posts, deletePost } = usePostContext();

  const allPosts = [...staticPosts, ...posts];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Blog Posts</h1>
      
      <div className="text-center">
        <Link href="/create">
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
            Add New Post
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {allPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600 transition duration-300"
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
