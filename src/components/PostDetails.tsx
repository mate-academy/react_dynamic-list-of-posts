import React, { useEffect, useState } from 'react';
// ИСПРАВЛЕНО: Удалили закомментированный импорт
// import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Status } from '../types/Status';
import { Loader } from './Loader';
import {
  deleteComment,
  getCommentsFromPostId,
  postComment,
} from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
};
export const PostDetails: React.FC<Props> = ({
  post,
  openForm,
  setOpenForm,
}) => {
  const [commentsLoadingStatus, setCommentsLoadingStatus] =
    useState<Status>('idle');

  const [loadingSubmitForm, setLoadingSubmitForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setCommentsLoadingStatus('loading');
    getCommentsFromPostId(post.id)
      .then(data => {
        setComments(data);
        setCommentsLoadingStatus('success');
      })
      .catch(() => {
        setCommentsLoadingStatus('error');
      });
  }, [post.id]);

  function handleFormSubmit(
    commentData: CommentData,
    clearFormBody: () => void,
  ) {
    setLoadingSubmitForm(true);
    postComment(commentData, post.id)
      .then(comment => {
        setComments(prev => [...prev, comment]);
        clearFormBody();
      })
      .catch(() => {
        setCommentsLoadingStatus('error');
      })
      .finally(() => {
        setLoadingSubmitForm(false);
      });
  }

  function handleDeleteComment(commentId: number) {
    const oldComments = comments;

    setComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      setComments(oldComments);
      setCommentsLoadingStatus('error');
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {commentsLoadingStatus === 'loading' && <Loader />}

          {commentsLoadingStatus === 'error' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {commentsLoadingStatus === 'success' && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {commentsLoadingStatus === 'success' && comments.length > 0 && (
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
            </>
          )}
          {!openForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(true)}
            >
              Write a comment
            </button>
          )}

          {openForm && (
            <NewCommentForm
              onFormSubmit={handleFormSubmit}
              loading={loadingSubmitForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};
