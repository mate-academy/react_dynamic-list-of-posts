import React, { useEffect, useState } from 'react';

import { Loader, CommentItem, NewCommentForm } from './index';
import { Post } from '../types';
import { useComments } from '../hooks/useComments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;

  const [isFormOpened, setIsFormOpened] = useState(false);
  const { comments, errorMessage, isLoading, deleteComment, addComment } =
    useComments(id);

  useEffect(() => setIsFormOpened(false), [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && !comments.length && (
          <>
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          </>
        )}

        {!isLoading && !errorMessage && !!comments.length && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <CommentItem
                comment={comment}
                onDelete={deleteComment}
                key={comment.id}
              />
            ))}
          </>
        )}
      </div>

      {!isLoading && !errorMessage && !isFormOpened && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsFormOpened(true)}
        >
          Write a comment
        </button>
      )}

      {!isLoading && !errorMessage && isFormOpened && (
        <NewCommentForm selectedPostId={id} onAddComment={addComment} />
      )}
    </div>
  );
};
