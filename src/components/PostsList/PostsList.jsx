import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { Loader } from '../Loader';

export const PostsList = ({ posts, changePostId }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {!posts.length ? (
        <Loader />
      ) : (
        <div className="PostsList">
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`User #${post.userId}`}</b>
                  <br />
                  {post.title}
                </div>

                {isClicked ? 
                (<button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      changePostId(0);
                      setIsClicked(false);
                    }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      changePostId(post.id);
                      setIsClicked(true);
                    }}
                  >
                    Open
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  changePostId: PropTypes.func.isRequired,
};
