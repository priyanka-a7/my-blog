import { useRouter } from 'next/router';
import { usePostContext } from '../../context/PostContext';
import PostForm from '../../components/PostForm';

const EditPostPage: React.FC = () => {
  const { posts, editPost } = usePostContext();
  const router = useRouter();
  const { id } = router.query;
  const postId = Number(id);

  const existingPost = posts.find((p) => p.id === postId);

  if (!existingPost) {
    return <div>Post not found</div>;
  }

  const handleSubmit = (title: string, content: string, author: string) => {
    const updatedPost = { ...existingPost, title, content, author };
    editPost(updatedPost);
    router.push('/'); // Redirect back to homepage after editing
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Edit Post</h1>
      <PostForm
        onSubmit={handleSubmit}
        initialTitle={existingPost.title}
        initialContent={existingPost.content}
        initialAuthor={existingPost.author || ''}
      />
    </div>
  );
};

export default EditPostPage;
