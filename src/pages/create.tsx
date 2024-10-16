import { usePostContext } from '../context/PostContext';
import PostForm from '../components/PostForm';

const CreatePostPage: React.FC = () => {
  const { addPost } = usePostContext();

  const handleSubmit = (title: string, content: string, author: string) => {
    const newPost = {
      id: Math.random(), // Replace with a more robust ID mechanism
      title,
      content,
      author,
      excerpt: content.substring(0, 50) + '...',
    };
    addPost(newPost);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePostPage;
