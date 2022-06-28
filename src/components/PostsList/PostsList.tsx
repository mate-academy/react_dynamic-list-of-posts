import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/post';
import { Post } from '../../react-app-env';
import './PostsList.scss';

type Props = {
  userSelect: string;
  setPostId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({
  userSelect,
  setPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    getUserPosts(userSelect)
      .then(post => setPosts(post));
  }, [userSelect]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
            data-cy="postDetails"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (post.id === selectedPostId) {
                  setSelectedPostId(0);
                  setPostId(0);
                } else {
                  setSelectedPostId(post.id);
                  setPostId(post.id);
                }
              }}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
