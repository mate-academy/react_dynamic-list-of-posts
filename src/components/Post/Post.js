import React from 'react';
import './Post.css';

import PropTypes from 'prop-types';
import { Users } from '../User/Users';
import { CommentList } from '../CommentList/CommentList';

export const Post = ({ data }) => (
  <div className="card">
    <div className="card-header">
      <h4 className="card-title">{data.title}</h4>
      <Users {...data.user} />
    </div>
    <div className="card-body">
      <p className="card-text">
        {data.body}
      </p>
      <CommentList comments={data.comments} />
    </div>
  </div>
);

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};
