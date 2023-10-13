import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { delComment, getComments } from '../api/Comment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isNoComments, setIsNoComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isWriteComment, setIsWriteComment] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    setIsNoComments(false);
    setComments([]);
    setIsWriteComment(false);
    if (post) {
      setIsLoadingComments(true);
      getComments(post.id)
        .then((fetchedComments) => {
          setComments(fetchedComments);
          if (fetchedComments.length === 0) {
            setIsNoComments(true);
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
  }, [post]);

  useEffect(() => {
    if (comments.length !== 0) {
      setIsNoComments(false);
    } else {
      setIsNoComments(true);
    }
  }, [comments]);

  const handleDeleteComment = (commentId: number) => {
    delComment(commentId)
      .then()
      .catch(() => {
        setErrorLoad(true);
      })
      .finally(() => {
        if (!errorLoad) {
          setComments((currentComments: Comment[]) => currentComments
            .filter(elem => elem.id !== commentId));
        }
      });
  };

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
          {isLoadingComments && (
            <Loader />
          )}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment: Comment) => (
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div
                    className="message-body"
                    data-cy="CommentBody"
                  >
                    {comment.body}
                  </div>

                  {errorLoad && (
                    <p className="help is-danger" data-cy="ErrorMessage">
                      Something went wrong! Try again later!
                    </p>
                  )}

                </article>
              ))}
            </>
          )}
          {!isWriteComment && !isLoadingComments && (
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
            setComments={setComments}
            comments={comments}
          />
        )}
      </div>
    </div>
  );
};
