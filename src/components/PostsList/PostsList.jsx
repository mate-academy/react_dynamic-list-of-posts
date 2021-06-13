import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader';

import { getPosts } from '../../api/posts';

import './PostsList.scss';

export const PostsList = ({
  selectedUserId,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [posts, setPosts] = useState([]);
  const [isPostOpen, setPostOpen] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    getPosts()
      .then((loadedPosts) => {
        if (selectedUserId === '0') {
          return loadedPosts;
        }

        return loadedPosts.filter(post => post.userId === +selectedUserId);
      })
      .then(setPosts);
  }, [selectedUserId]);

  const openPost = () => setPostOpen(true);
  const closePost = () => setPostOpen(false);

  return (
    <>
      { !posts.length ? (
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
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>

                {(isPostOpen && selectedPostId === post.id) ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      closePost();
                      setSelectedPostId(0);
                    }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      openPost();
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
      )
    }
    </>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};
