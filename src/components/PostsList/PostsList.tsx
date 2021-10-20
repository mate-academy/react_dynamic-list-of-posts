import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  selectPost: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({ selectedUserId, selectedPostId, selectPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(result => setPosts(result));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && (
          posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>
                  User #
                  {post.userId}
                  :
                </b>
                {' '}
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectPost(post.id);
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
