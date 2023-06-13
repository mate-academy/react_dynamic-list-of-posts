import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { ErrorMessage } from '../types/Error';

type Props = {
  postComments: Comment[],
  selectedPost: Post,
  handleDeleteComment: (commntId: number) => void,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  isLoadingComments: boolean,
  error: ErrorMessage,
  setError: React.Dispatch<React.SetStateAction<ErrorMessage>>,
};

export const PostDetails: React.FC<Props> = ({
  postComments,
  selectedPost,
  handleDeleteComment,
  setPostComments,
  isLoadingComments,
  error,
  setError,
}) => {
  const [openCommentForm, setOpenCommentForm] = useState(false);

  useEffect(() => {
    setOpenCommentForm(false);
  }, [selectedPost]);

  const {
    id,
    title,
    body,
  } = selectedPost;

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

        <div className="block">
          {isLoadingComments && (
            <Loader />
          )}

          {error !== ErrorMessage.None && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {(!postComments.length && !isLoadingComments) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {postComments.map(comment => {
            const {
              name,
              email,
            } = comment;

            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={id}
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            );
          })}

          {(!openCommentForm && !isLoadingComments) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openCommentForm && (
          <NewCommentForm
            selectedPost={selectedPost}
            postComments={postComments}
            setPostComments={setPostComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
