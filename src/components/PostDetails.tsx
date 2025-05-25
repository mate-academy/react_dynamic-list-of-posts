import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Form } from '../types/Form';

type Props = {
  postId: number | null;
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  posts: Post[];
  form: Form;
  isCommentLoading: boolean;
  isFormActive: boolean;
  formNameError: boolean;
  formEmailError: boolean;
  formBodyError: boolean;
  setIsFormActive: () => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  deleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  postId,
  comments,
  isLoading,
  isCommentLoading,
  isError,
  posts,
  form,
  isFormActive,
  formNameError,
  formEmailError,
  formBodyError,
  setIsFormActive,
  onChange,
  onSubmit,
  onReset,
  deleteComment,
}) => {
  const post = posts.find(p => p.id === postId);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {post && (
          <div className="block">
            <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
            <p data-cy="PostBody">{post.body}</p>
          </div>
        )}

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>
                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isFormActive && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={setIsFormActive}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            onReset={onReset}
            formNameError={formNameError}
            formEmailError={formEmailError}
            formBodyError={formBodyError}
            isCommentLoading={isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
