import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

// Mock data for static post generation
const posts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const post = posts.find((p) => p.id === Number(id));
  return { props: { post } };
};

const PostPage: React.FC<{ post: { id: number; title: string; content: string } }> = ({ post }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p>{post.content}</p>
      <Link href="/" className="mt-4 block text-blue-500">
        Back to Home
      </Link>
    </div>
  );
};

export default PostPage;
