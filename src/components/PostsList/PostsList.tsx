import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  userId: number,
  selectedPostId: number,
  setPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({ userId, selectedPostId, setPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const postsFromServer = await getUserPosts(userId);

      setPosts(postsFromServer);
    }

    loadPosts();
  }, [userId]);

  const handleOpenPost = (postId: number) => {
    setPostId(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPostId !== post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenPost(post.id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenPost(0)}
              >
                Close
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
