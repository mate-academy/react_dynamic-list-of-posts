import React, { useContext } from 'react';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';
import { ListContext } from './ListContext';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    isCommentFormVisible,
  } = useContext(ListContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <CommentsList />

        {isCommentFormVisible && <NewCommentForm />}
      </div>
    </div>
  );
};
