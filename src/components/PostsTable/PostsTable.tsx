import { useEffect, useState } from 'react';
import { Post } from '../../types';
import { client } from '../../utils/fetchClient';
import './PostsTable.scss';

interface Props {
  userId: number;
  onPostSelect: (post: Post) => void;
  selectedPostId: number | null;
}

export const PostsTable: React.FC<Props> = ({
  userId,
  onPostSelect,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const loadedPosts = await client.get<Post[]>(`/posts?userId=${userId}`);

        setPosts(loadedPosts);
      } catch (e) {
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="loader" data-cy="Loader">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        {error}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      {posts.map(post => (
        <div key={post.id} className="box" data-cy="Post">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <p className="title is-5" data-cy="PostTitle">
                  {post.title}
                </p>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button
                  type="button"
                  className={`button ${selectedPostId === post.id ? '' : 'is-light'}`}
                  data-cy="PostButton"
                  onClick={() => {
                    if (selectedPostId === post.id) {
                      onPostSelect({ ...post, id: 0 }); // Send invalid post to clear selection
                    } else {
                      onPostSelect(post);
                    }
                  }}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </div>
            </div>
          </div>
          <div data-cy="PostId" style={{ display: 'none' }}>
            {post.id}
          </div>
        </div>
      ))}
    </div>
  );
};
