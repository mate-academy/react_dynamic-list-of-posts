/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { deleteComment, getComments, postComment } from '../api/serverData';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isClickOnWrite, setIsClickOnWrite] = useState(false);
  const [isResponse, setIsResponce] = useState(false);

  const loadPostComments = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const commentsFromServer = await getComments(post.id);

      if (commentsFromServer.length) {
        setComments(commentsFromServer);
      }
    } catch {
      setIsError(true);
      Notiflix.Notify.failure('Can`t get comments.Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const postPostComment = async (comment: CommentData) => {
    try {
      setIsResponce(false);
      const postCommentOnServer = await postComment(comment);

      if (postCommentOnServer) {
        setComments(prev => [...prev, { ...comment, id: 0 }]);
      }
    } catch {
      Notiflix.Notify.failure(
        'Can`t add comment rigth now.Please try again later',
      );
    } finally {
      setIsResponce(true);
    }
  };

  const deletePostComment = (commentId: number) => {
    try {
      deleteComment(commentId);

      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch {
      console.error;
    }
  };

  useEffect(() => {
    loadPostComments();
    setIsClickOnWrite(false);

    return () => setComments([]);
  }, [post.id]);

  const { id, title, body } = post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #
            {id}
            :
            {' '}
            {title}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>
        <div className="block">
          {isLoading
          && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => {
                  return (
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
                          onClick={() => {
                            deletePostComment(comment.id);
                          }}
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
              </>
            )}

          {!isClickOnWrite && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsClickOnWrite(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isClickOnWrite && (
          <NewCommentForm
            onFormSubmit={postPostComment}
            isResponse={isResponse}
            currentPostId={id}
          />
        )}
      </div>
    </div>
  );
};
