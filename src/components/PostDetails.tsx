import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getCommentsByPost, removeComment } from '../api/api';

type Props = {
  postSelected: Post | null;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  isFormVisible: boolean;
  setIsFormVisible: (arg: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  postSelected,
  comments,
  setComments,
  isFormVisible,
  setIsFormVisible,
}) => {
  const [commentsError, setCommentsError] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    setCommentsLoading(true);
    getCommentsByPost(postSelected?.id ?? null)
      .then(setComments)
      .catch(() => setCommentsError('Unable to load comments'))
      .finally(() => setCommentsLoading(false));
  }, [postSelected, setComments]);

  const deleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    removeComment(commentId).catch(() => {
      setCommentsError('Unable to delete comment');
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postSelected?.id}: ${postSelected?.title}`}
          </h2>

          <p data-cy="PostBody">{postSelected?.body}</p>
        </div>

        <div className="block">
          {commentsLoading && <Loader />}

          {!commentsLoading && commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          )}

          {comments.length === 0 && !commentsLoading && !commentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
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

          {!commentsLoading && !commentsError && !isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isFormVisible && (
          <NewCommentForm
            postSelected={postSelected}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
