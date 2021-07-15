import React from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';

import { PostCard } from '../PostCard';

export const PostsList = React.memo(({ posts, users, callBack }) => (
  <ul className="posts">
    {
        posts.map(post => (
          <React.Fragment key={post.id}>
            <PostCard
              users={users}
              callBack={callBack}
              post={post}
            />
          </React.Fragment>
        ))
      }
  </ul>
));

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  callBack: PropTypes.func.isRequired,
};
