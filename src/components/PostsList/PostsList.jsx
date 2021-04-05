import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ setPostDetails }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const getPosts = async() => {
    const response = await getUserPosts();

    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // eslint-disable-next-line no-console
  console.log(posts);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setPostDetails(false);
                  setSelectedPostId(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setPostDetails(true);
                  setSelectedPostId(post.id);
                }}
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
