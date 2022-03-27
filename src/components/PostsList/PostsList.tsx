/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    getPosts()
      .then(response => setPosts(response));
  }, []);
  console.log(posts); // NEED TO DELETE

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            {selectedPost ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPost(!selectedPost)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setSelectedPost(!selectedPost)}
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
