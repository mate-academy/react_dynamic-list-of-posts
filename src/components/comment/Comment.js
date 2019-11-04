import React from 'react';
import { Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const PostComment = ({ userName, commentText }) => (
  <Comment>
    <Comment.Avatar src="https://semantic-ui.com/images/avatar/large/chris.jpg" />
    <Comment.Content>
      <Comment.Author as="a">{userName}</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>{commentText}</Comment.Text>
    </Comment.Content>
  </Comment>
);

PostComment.propTypes = {
  userName: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
};

export default PostComment;
