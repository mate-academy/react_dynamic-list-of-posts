import React from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  post: Post;
  isLoadingComments: boolean;
  error: string | null;
  comments: Comment[];
  formOpen: (marker: boolean) => void;
  isFormOpen: boolean;
  deleteComment: (id: number) => void;
  addComment: (comment: Comment) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isLoadingComments,
  error,
  comments,
  formOpen,
  isFormOpen,
  deleteComment,
  addComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
          <p data-cy="PostBody">{post.body}</p>
        </div>

        {isLoadingComments ? (
          <Loader />
        ) : (
          <div className="block">
            {error && (
              <div className="notification is-danger" data-cy="CommentsError">
                {error}
              </div>
            )}

            {comments.length === 0 && !error && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!error && comments && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href="mailto:misha@mate.academy"
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => deleteComment(comment.id)}
                      ></button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => formOpen(true)}
            >
              Write a comment
            </button>
          </div>
        )}

        {isFormOpen && (
          <NewCommentForm
            postId={post.id}
            onSubmit={addComment}
            isLoadingComments={isLoadingComments}
          />
        )}
      </div>
    </div>
  );
};
