import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment as CommentType, CommentData } from '../types/Comment';
import { useError } from '../hooks/useError';
import { Comment } from './Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
  comments: CommentType[];
  setComments: (comments: CommentType[]) => void;
  deleteComment: (id: number) => Promise<unknown>;
  loadComments: () => Promise<CommentType[]>;
  addComment: (postId: number, comment: CommentData) => Promise<CommentType>;
};

const PostDetailsBase: React.FC<Props> = ({
  post,
  comments,
  setComments,
  deleteComment,
  loadComments,
  addComment,
}) => {
  const { id, body, title } = post;
  const [isNewCommentFormVisible, setIsNewCommentFormVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { error, setErrorMessage, clearErrorMessage } = useError();

  useEffect(() => {
    clearErrorMessage();
    setIsLoading(true);

    loadComments()
      .catch(() => setErrorMessage('Cannot load comments.'))
      .finally(() => setIsLoading(false));
  }, [loadComments, setErrorMessage, clearErrorMessage, setComments]);

  useEffect(() => {
    setIsNewCommentFormVisible(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {error.id && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error.message}
          </div>
        )}

        {!error.id && !isLoading && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length !== 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <Comment
                setErrorMessage={setErrorMessage}
                clearErrorMessage={clearErrorMessage}
                key={comment.id}
                comment={comment}
                onCommentDeleted={deleteComment}
              />
            ))}
          </>
        )}

        {!isLoading && !error.id && (
          <>
            {isNewCommentFormVisible ? (
              <NewCommentForm onSubmit={addComment} postId={post.id} />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsNewCommentFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const PostDetails = React.memo(PostDetailsBase);
