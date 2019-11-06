import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CommentItem = ({ comment }) => (
  <Comment>
    <Comment.Avatar src="https://source.unsplash.com/600x600/?cars" />
    <Comment.Content>
      <Comment.Author as="a">{comment.name}</Comment.Author>
      <Comment.Metadata>
        <div>{comment.email}</div>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

CommentItem.propTypes = {
  comment: PropTypes.shape().isRequired,
};

export default CommentItem;
