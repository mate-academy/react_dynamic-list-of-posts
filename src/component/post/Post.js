import React from 'react';
import PropTypes from 'prop-types';
import User from '../user/User';
import { generatorAvatar } from '../generatorAvatar';
import CommentList from '../commentList/CommentList';
import './Post.css';

function Post({ table }) {
  return (
    <>
      <div className="ui card">
        <div className="content">
          <img className="ui avatar image" src={generatorAvatar()} alt="ava" />
          <User name={table.user.name} />
        </div>
        <div className="image">
          <img alt="ava" src={generatorAvatar()} />
        </div>
        <p>{table.title}</p>
        <div className="content">{table.body}</div>
      </div>
      {table.comments.map(item => <CommentList key={item.id} comment={item} />)}
    </>
  );
}

Post.propTypes = {
  table: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Post;
