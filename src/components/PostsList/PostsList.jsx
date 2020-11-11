/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { GetUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userId,
  selectedPostId,
  setSelectedPostId,
  setLoading,
}) => {
  const [loadingPosts, setloadingPosts] = useState(true);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    setloadingPosts(true);
    GetUserPosts(userId)
      .then((user) => {
        updatePosts(user);
        setloadingPosts(false);
      });
  }, [userId]);

  useEffect(() => {
    GetUserPosts(userId)
      .then(updatePosts);
  }, [userId]);
  // console.log(loading)

  return (
    <>
      {loadingPosts
        ? <Loader />
        : (
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
                      `[User #${post.userId}]`
                    </b>
                    Post text:
                    {' '}
                    {post.title}

                  </div>
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      selectedPostId === post.id
                        ? setSelectedPostId(null)
                        : setSelectedPostId(post.id);
                    }
                    }
                  >
                    {selectedPostId === post.id
                      ? 'Close'
                      : 'Open'
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )

      }
    </>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
