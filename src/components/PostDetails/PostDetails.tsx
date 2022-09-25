import React, { useEffect, useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { deleteComment } from '../../utils/fetch_Comments';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentsForm/NewCommentForm';

type Props = {
  isCommentsLoaded: boolean,
  selectedPost: Post | null,
  comments: Comment[],
  loadingError: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const PostDetails: React.FC<Props> = ({
  isCommentsLoaded,
  comments,
  selectedPost,
  loadingError,
  setComments,
}) => {
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);
  const [deletionError, setDeletionError] = useState('');

  useEffect(() => {
    setIsNewFormVisible(false);
  }, [isCommentsLoaded]);

  const handleDeleteBtnClick = (commentId: number) => {
    if (commentId) {
      const copyComments = [...comments];

      setComments(comments.filter(comment => comment.id !== commentId));

      deleteComment(commentId)
        .then(deletedComment => {
          if (deletedComment && typeof deletedComment === 'object') {
            if (Object.values(deletedComment).includes('Not Found')) {
              setDeletionError('Unable to delete a comment');
              setComments(copyComments);
            }
          }
        })
        .catch(() => setDeletionError('Something went wrong!'));
    }
  };

  return (
    <div
      className={
        selectedPost
          ? 'PostDetails-show'
          : 'content'
      }
      data-cy="PostDetails"
    >
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        {loadingError
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {loadingError}
            </div>
          )}

        {!isCommentsLoaded
          ? (
            <div className="block">
              <Loader />
            </div>
          ) : (
            <>
              <p
                className="title is-4"
              >
                {comments.length ? 'Comments:' : 'No comments yet'}
              </p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => {
                        if (comment.id) {
                          handleDeleteBtnClick(comment.id);
                        }
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

              {deletionError
              && (
                <div className="notification is-danger">
                  {deletionError}
                </div>
              )}

              {!isNewFormVisible
             && (
               <button
                 data-cy="WriteCommentButton"
                 type="button"
                 className="button is-link"
                 onClick={() => setIsNewFormVisible(true)}
               >
                 Write a comment
               </button>
             )}
            </>
          )}

      </div>

      {isNewFormVisible
        && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
          />
        )}
    </div>
  );
};
