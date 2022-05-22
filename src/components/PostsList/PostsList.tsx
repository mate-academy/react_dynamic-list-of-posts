import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUser: number,
  saveSelectedPost: (postId: number) => void,
  selectedPost: number,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  saveSelectedPost,
  selectedPost,
}) => {
  const [postsList, setPostsList] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(posts => setPostsList(posts));
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsList && (
          postsList.map(post => (
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
                onClick={() => saveSelectedPost(post.id)}
              >
                {selectedPost === post.id ? (
                  'Close'
                ) : (
                  'Open'
                )}
              </button>
            </li>
          )))}
      </ul>
    </div>
  );
};
