import React from 'react';
import { NewCommentForm } from './NewCommentForm';
import { useAppContext } from '../context/AppContext';
import { CommentsList } from './CommentsList';
import { CommentContextProvider } from '../context/CommentContext';

export const PostDetails: React.FC = () => {
  const { selectedPost: post } = useAppContext();

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.title}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <CommentContextProvider>
          <CommentsList />
        </CommentContextProvider>

        <NewCommentForm />
      </div>
    </div>
  );
};
