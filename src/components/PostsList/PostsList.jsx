import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/api';
import './PostsList.scss';

export const PostsList = ({
  userId,
  selectedPostId,
  changeSelectedPostId,
}) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserPosts(userId).then(userPosts => setPosts(userPosts));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts ? (
        <ul className="PostsList__list">
          {posts && posts.map(post => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`[User #${post.userId}]`}</b>
                <br />
                {post.title}
              </div>

              {selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => changeSelectedPostId(0)}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => changeSelectedPostId(post.id)}
                  >
                    Open
                  </button>
                )
              }

            </li>
          ))}
        </ul>
      ) : (
        <React.Fragment>
          Loading...
        </React.Fragment>
      )}

    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  changeSelectedPostId: PropTypes.func.isRequired,
};
