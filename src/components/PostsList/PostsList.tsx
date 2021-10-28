import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

interface Props {
  selectedUserId: number
  onPostId: any
  button: boolean
  selectedPostId: number
}

export const PostsList: React.FC<Props> = ({
  selectedUserId, onPostId, selectedPostId, button,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts()
      .then(result => setPosts(result));
  }, []);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(result => setPosts(result));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {
          const { title, userId, id } = post;

          return (
            <li key={id} className="PostsList__item">
              <div>
                <b>{`[User #${userId}]: `}</b>
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onPostId(id)}
              >
                {(selectedPostId === id && button) ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
