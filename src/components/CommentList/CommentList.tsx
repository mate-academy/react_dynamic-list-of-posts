import React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { CommentItem } from '../CommentItem';

type PropsCommentList = {
  comments: Comment[];
};

export const CommentList: React.FC<PropsCommentList> = ({ comments }) => (
  <Comment.Group>
    <Header as="h3" dividing content="Comments" />
    {comments.map(comment => <CommentItem key={comment.id} {...comment} />)}
  </Comment.Group>
);
