import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { post } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasLoadingError, setHasLoadingComments] = useState(false);
  const [hasLoadingEnd, setHasLoadingEnd] = useState(false);
  const [isWriteComment, setIsWriteComment] = useState(false);

  useEffect(
    () => {
      setIsLoadingComments(true);
      client.get<Comment[]>(`/comments?postId=${post.id}`)
        .then(result => {
          setComments(result.map(comment => (
            {
              id: comment.id,
              postId: comment.postId,
              name: comment.name,
              email: comment.email,
              body: comment.body,
            }
          )));
        })
        .catch(() => {
          setHasLoadingComments(true);
        })
        .finally(() => {
          setIsLoadingComments(false);
          setHasLoadingEnd(true);
        });
    },
    [post],
  );

  const onAddComment = useCallback(
    (comment: Comment) => {
      setComments(prev => [...prev, comment]);
      setIsWriteComment(false);
    },
    [],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {hasLoadingError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {hasLoadingEnd && comments.length === 0 && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => {
                        client.delete(`/comments/${comment.id}`)
                          .then(res => {
                            if (res) {
                              setComments(prev => (
                                prev.filter(com => com.id !== comment.id)
                              ));
                            }
                          });
                      }}
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

          {!isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment && (
          <NewCommentForm
            postId={post.id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
