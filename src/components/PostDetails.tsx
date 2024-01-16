import React, { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { useAppContext } from '../context/AppContext';
import { CommentsList } from './CommentsList';
import { CommentContextProvider } from '../context/CommentContext';

export const PostDetails: React.FC = () => {
  const { selectedPost: post } = useAppContext();

  const [writeMode, setWriteMode] = useState<boolean>(false);

  useEffect(() => {
    setWriteMode(false);
  }, [post]);

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
          <div className="block">
            <CommentsList />

            {!writeMode && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setWriteMode(true)}
              >
                Write a comment
              </button>
            )}

          </div>

          {writeMode && <NewCommentForm />}
        </CommentContextProvider>
      </div>
    </div>
  );
};
