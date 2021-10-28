import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  userId: number;
  selectedPostId: number;
  setPostId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({ userId, selectedPostId, setPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts()
      .then(postsFromServer => setPosts(postsFromServer));
  }, []);

  const handleDetailsPost = (id: number) => {
    setPostId(selectedPostId === id ? 0 : id);
  };

  const postFiltered = userId !== 0
    ? posts.filter(post => post.userId === userId)
    : posts;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postFiltered.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`User #${post.userId} `}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                handleDetailsPost(post.id);
              }}
            >
              {post.id === selectedPostId
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};
