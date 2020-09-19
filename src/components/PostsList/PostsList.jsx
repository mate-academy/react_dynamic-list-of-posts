import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getPosts } from '../../api/api';
import { getPostDetails } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ setPost, searchByUser }) => {
  const [posts, setPosts] = useState([]);
  const [viewDetails, setViewDetails] = useState(0);

  useEffect(() => {
    if (+searchByUser === 0) {
      getPosts()
        .then(setPosts);

      return;
    }

    getPosts()
      .then(result => result.filter(item => item.userId === +searchByUser))
      .then(setPosts);
  }, [searchByUser]);

  const seeMore = (post) => {
    if (viewDetails === post.id) {
      setPost(null, null);
      setViewDetails(null);

      return;
    }

    getPostDetails(post.id);
    setViewDetails(post.id);
    setPost(post.id, post);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(item => (
          <li className="PostsList__item" key={item.id}>
            <div>
              <b>
                {`[User ${item.userId}]:`}
                {' '}
              </b>
              {item.title}
            </div>
            <button
              type="button"
              className={classNames({
                PostsList__button: true,
                button: true,
              })}
              onClick={() => seeMore(item)}
            >
              {
                viewDetails === item.id
                  ? 'Close'
                  : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  setPost: PropTypes.func.isRequired,
  searchByUser: PropTypes.number,
};

PostsList.defaultProps = {
  searchByUser: 0,
};
