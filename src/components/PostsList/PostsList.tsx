import React, { useCallback } from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number | null,
  setSelectedPostId: (id: number | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => {
  // const [selectedPost, setSelectedPost] = useState(selectedPostId);

  const handleVisibilityOfDetails = useCallback((id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(null);
    }

    if (id !== selectedPostId) {
      setSelectedPostId(id);
    }

    if (selectedPostId === null) {
      setSelectedPostId(id);
    }
  }, [selectedPostId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map((post) => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleVisibilityOfDetails(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
