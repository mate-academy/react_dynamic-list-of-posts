import React from 'react';
import { Post } from '../types';
import { CommentsList } from './CommentsList';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, body, title } = post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <CommentsList postId={id} />
      </div>
    </div>
  );
};
