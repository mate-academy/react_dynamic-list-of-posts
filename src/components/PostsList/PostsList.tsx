import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  userId: number,
  selectedPost: number,
  selectPost: (id: number) => void,
}

export const PostsList: React.FC<Props> = ({ userId, selectPost, selectedPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSetPosts = () => {
    getUserPosts(userId)
      .then(postsFromServer => setPosts(postsFromServer));
  };

  useEffect(() => handleSetPosts(), [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {userId}
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectPost(selectedPost === post.id ? 0 : post.id);
              }}
            >
              {selectedPost === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
