import React, { useContext } from 'react';
import { NewCommentForm } from './NewCommentForm';
import {
  ActivePostContext,
  CommentFormContext,
  CommentListContext,
} from '../../../utils/Store';
import { CommentList } from './../CommentList/CommentList';

export const PostDetails: React.FC = () => {
  const { activePost } = useContext(ActivePostContext);
  const { comments } = useContext(CommentListContext);
  const { isActiveForm } = useContext(CommentFormContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${activePost?.id}: ${activePost?.title}`}</h2>

        <p data-cy="PostBody">{activePost?.body}</p>
      </div>

      {activePost && <CommentList comments={comments} />}

      {isActiveForm && <NewCommentForm />}
    </div>
  );
};
