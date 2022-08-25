import React from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null,
  comments: Comment[],
  setComments(comments: Comment[]): void,
  error: boolean,
  loading: boolean,
  writingComment: boolean,
  setWritingComment(writingComment: boolean): void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  error,
  loading,
  writingComment,
  setWritingComment,
}) => (
  <div className="content" data-cy="PostDetails">
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {loading ? <Loader /> : (
          <>
            {error ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                {!comments.length ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
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
                            href={`mailto:${comment.email}`}
                            data-cy="CommentAuthor"
                          >
                            {comment.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => setComments(comments
                              .filter(currentComment => currentComment
                                !== comment))}
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

                {!writingComment && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setWritingComment(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      {writingComment && (
        <NewCommentForm
          comments={comments}
          setComments={setComments}
          postId={post?.id}
        />
      )}
    </div>
  </div>
);
