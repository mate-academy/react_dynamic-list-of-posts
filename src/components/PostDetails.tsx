import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentInfo } from './CommentsInfo';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null,
  comments: Comment[],
  isLoadComments: boolean,
  isErrorLoadComments: boolean,
  isPostNewComment: boolean,
  isErrorPostComments: boolean,
  safeBodyComments: boolean,
  isErrorDelete: boolean,
  setIsErrorDelete: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorPostComments: React.Dispatch<React.SetStateAction<boolean>>,
  onAddComment: (name: string, email: string, body: string) => void,
  deletePost: (id: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadComments,
  isErrorLoadComments,
  isErrorDelete: errorDelete,
  isPostNewComment,
  isErrorPostComments,
  safeBodyComments,
  setErrorPostComments,
  onAddComment,
  deletePost,
  setIsErrorDelete,
}) => {
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);
  const hendlerAddNewComment = (): void => {
    setIsActiveForm(true);
  };

  useEffect(() => {
    if (isErrorPostComments) {
      setTimeout(() => setErrorPostComments(false), 1500);
    }

    if (errorDelete) {
      setTimeout(() => setIsErrorDelete(false), 1500);
    }
  }, [isErrorPostComments, errorDelete]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.title}
          </p>
        </div>
        {isLoadComments || <Loader />}

        <div className="block">
          {isErrorLoadComments && isLoadComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isLoadComments && !!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <CommentInfo
                    comment={comment}
                    onDelete={deletePost}
                  />
                </article>
              ))}
            </>
          )}

          {isLoadComments && !comments.length && !isErrorLoadComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {errorDelete && (
            <div className="notification is-danger">
              can`t delete, try again
            </div>
          )}

          {isLoadComments && !isErrorLoadComments && !isActiveForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={hendlerAddNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isActiveForm && (
          <NewCommentForm
            onAddComment={onAddComment}
            isPostNewComment={isPostNewComment}
            safeBodyComments={safeBodyComments}
          />
        )}

        {isErrorPostComments && (
          <div className="notification is-danger">Can`t post, try again</div>
        )}
      </div>
    </div>
  );
};
