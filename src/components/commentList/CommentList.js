import React from 'react';
import { Button, Comment, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CommentItem from '../comment/Comment';

const CommentList = ({ commentList }) => (
  <Modal
    size="tiny"
    trigger={(
      <Button
        basic
        content="Comments"
        floated="right"
        size="tiny"
        icon="comment outline"
        labelPosition="right"
      />
    )}
  >
    <Modal.Header>Post comments</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Comment.Group>
          {commentList.map(comment => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </Comment.Group>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

CommentList.propTypes = {
  commentList: PropTypes.shape().isRequired,
};

export default CommentList;
