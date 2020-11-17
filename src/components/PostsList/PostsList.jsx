/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
import React, { useEffect, useState, useContext } from 'react';
import './PostsList.scss';
import { AppContext } from '../../AppContext';

import { PostsListItem } from '../PostListItem';
import { getUserPosts } from '../../api/posts';

export const PostsList = (props) => {
  const [posts, setPosts] = useState([]);
  const { userId } = useContext(AppContext);

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
                <PostsListItem post={item} />
              </li>
            ))
          : 'no posts'}
      </ul>
    </div>
  );
};
