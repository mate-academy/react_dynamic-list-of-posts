import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/post';

type Props = {
  selectedUser: number;
  selectedPostId: number | null;
  onPostSelect: (arg0: number) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectedPostId,
  onPostSelect,
}) => {
  const [userPosts, setUserPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(loadedPosts => setUserPosts(loadedPosts))
      .catch(error => {
        throw new Error(error);
      });
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {userPosts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]
                :&nbsp;
              </b>

              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostSelect(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
