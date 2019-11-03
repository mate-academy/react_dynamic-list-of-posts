import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Comment from '../comment/Comment';

const CommentList = ({ comments }) => (
  <List>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))
    }
  </List>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
