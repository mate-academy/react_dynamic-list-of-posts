/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

import { PostsListItem } from '../PostListItem';

import { getUserPosts } from '../../api/posts';

export const PostsList = (props) => {
  const [posts, setPosts] = useState([]);
  const { userId, setSelectedPostId, selectedPostId } = props;

  useEffect(() => {
    getUserPosts(userId).then((res) => setPosts(res));
  }, []);

  useEffect(() => {
    getUserPosts(userId).then((res) => setPosts(res));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0
          ? posts.map((item) => (
              <li key={item.id} className="PostsList__item">
                <PostsListItem
                  post={item}
                  setSelectedPostId={setSelectedPostId}
                  selectedPostId={selectedPostId}
                />
              </li>
            ))
          : 'no posts'}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string,
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number,
};

PostsList.defaultProps = {
  userId: '',
  selectedPostId: 0,
};
