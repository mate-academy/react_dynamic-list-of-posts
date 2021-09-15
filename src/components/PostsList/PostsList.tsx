import React, { useEffect, useState } from 'react';
import { getAllPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  selectedUserID: number;
}

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserID } = props;
  const [userID, setUserID] = useState(selectedUserID);
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    setUserID(selectedUserID);

    if (userID === 0) {
      getAllPosts()
        .then(response => setPosts(response));

      return;
    }

    getUserPosts(selectedUserID)
      .then(response => setPosts(response));
    // eslint-disable-next-line no-console
    console.log('refresh post list');
  }, [selectedUserID]);

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
              <b>{`[User #${post.userId}]: `}</b>
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
            >
              Close
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
