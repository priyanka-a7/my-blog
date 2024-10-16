// src/components/Post.tsx
import React from 'react';
import Image from 'next/image';

interface PostProps {
  title: string;
  content: string;
  imageUrl: string;
}

const Post: React.FC<PostProps> = React.memo(({ title, content, imageUrl }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Image src={imageUrl} alt={title} width={500} height={300} />
      <p>{content}</p>
    </div>
  );
});

export default Post;
