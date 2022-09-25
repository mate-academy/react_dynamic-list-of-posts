import React, { useEffect, useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { deleteComment, getComments } from '../../utils/fetch_Comments';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentsForm/NewCommentForm';

type Props = {
  selectedPost: Post | null,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
  const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    setIsCommentsLoaded(false);
    setComments([]);

    getComments()
      .then(commentsFromApi => {
        setComments(
          commentsFromApi.filter(
            comment => comment.postId === selectedPost?.id,
          ),
        );
        setIsCommentsLoaded(true);
      })
      .catch(() => setCommentsError('Something went wrong!'));
  }, [selectedPost]);

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
              setCommentsError('Unable to delete a comment');
              setComments(copyComments);
            }
          }
        })
        .catch(() => setCommentsError('Something went wrong!'));
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

        {commentsError
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
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
