import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import * as CommentsServices from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isComment, setIsComment] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsComment(false);

    CommentsServices.getComments(post)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  const { id, title, body } = post;

  const deleteComment = (commentId: number) => () => {
    if (comments) {
      setComments(() => comments.filter(comment => comment.id !== commentId));
    }

    CommentsServices.deleteComment(commentId)
      .catch(() => {
        setIsError(true);
        setComments(comments);
      });
  };

  const onButtonClick = () => {
    setIsComment(true);
  };

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
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && comments && (!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const { name, email } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${email}`}
                        data-cy="CommentAuthor"
                      >
                        {name}
                      </a>

                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={deleteComment(comment.id)}
                      />
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                );
              })}
            </>
          ))}

          {!isComment && !isError && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={onButtonClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isComment && (
          <NewCommentForm
            setComments={setComments}
            postId={post.id}
            setIsError={setIsError}
          />
        )}
      </div>
    </div>
  );
};
