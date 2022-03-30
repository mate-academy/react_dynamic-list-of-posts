import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { loadUsersPosts } from '../../api/posts';

type Props = {
  handleOpenPostDetails: (postId: number) => void;
  postId: number;
  selectorValue: number;
};

export const PostsList: React.FC<Props> = ({
  handleOpenPostDetails,
  postId,
  selectorValue,
}) => {
  const [postList, setPostList] = useState<Post[]>([]);

  const getUserPosts = async () => {
    const userPostsFromServer = await loadUsersPosts();

    if (selectorValue) {
      return setPostList(userPostsFromServer.filter(post => post.userId === selectorValue));
    }

    return setPostList(userPostsFromServer);
  };

  useEffect(() => {
    getUserPosts();
  }, [selectorValue]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postList.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            {postId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenPostDetails(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenPostDetails(post.id)}
              >
                Open
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
