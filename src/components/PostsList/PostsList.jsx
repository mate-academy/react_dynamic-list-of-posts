import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ person, selectedPostId, postId }) => {
  const [posts, setPosts] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const { id, name } = person;

  useEffect(() => {
    if (name && name !== 'All users') {
      getUserPosts()
        .then(result => setPosts(result.data
          .filter(post => post.userId === id)));
    } else {
      getUserPosts()
        .then(result => setPosts(result.data));
    }
  }, [name, id]);

  const handleClick = (postID, choosen) => {
    selectedPostId(postID, choosen);
    setButtonStatus(choosen)
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={(event) => {
                debugger;
                event.target.innerText === 'Open'
                  ? handleClick(post.id, true)
                  : handleClick(post.id, false);
                ;
              }}
            >
              {buttonStatus && post.id === postId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  selectedPostId: PropTypes.func.isRequired,
  postId: PropTypes.number,
};

PostsList.defaultProps = {
  person: PropTypes.shape({
    name: '',
  }).isRequired,
  postId: null,
};
