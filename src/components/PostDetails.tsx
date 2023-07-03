import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { NewCommentForm } from './NewCommentForm';
import { CommentItem } from './CommentItem';
import { deleteComment, getComments } from '../api/coments';
import { ErrorMessages } from '../types/ErrorMessages';

type Props = {
  selectedPost: Post,
};
export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [isShowCommentForm, setIsShowCommentForm] = useState<boolean>(false);
  const [commentsFromServer, setCommentsFromServer] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    id,
    title,
    body,
  } = selectedPost;

  const handleDeleteComment = (commentId: number) => {
    setCommentsFromServer((prevComments) => prevComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId);
  };

  const handleAddNewComment = () => {
    setIsShowCommentForm(true);
  };

  const handleCreateNewComment = (comment: Comment) => {
    setCommentsFromServer((prevState) => {
      return [...prevState, comment];
    });
  };

  useEffect(() => {
    if (selectedPost) {
      setIsLoader(true);
      getComments(id)
        .then(setCommentsFromServer)
        .then(() => {
          setIsShowCommentForm(false);
        })
        .catch(() => {
          setIsError(true);
          setIsShowCommentForm(false);
        })
        .finally(() => {
          setIsLoader(false);
        });
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost && (
              `#${id}: ${title}`
            )}
          </h2>

          <p data-cy="PostBody">
            {selectedPost && (
              body
            )}
          </p>
        </div>

        <div className="block">
          {isLoader && !!commentsFromServer.length && !isError && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {ErrorMessages.Wrong}
            </div>
          )}

          {!commentsFromServer.length && !isError ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}

          {!!commentsFromServer.length && !isError && (
            commentsFromServer.map((comment) => (
              <CommentItem
                comment={comment}
                onDeleteComment={handleDeleteComment}
                key={comment.id}
              />
            )))}

          {!isShowCommentForm && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleAddNewComment}
            >
              Write a comment
            </button>
          )}
        </div>
        {isShowCommentForm && (
          <NewCommentForm
            postId={id}
            createNewComment={handleCreateNewComment}
          />
        )}
      </div>
    </div>
  );
};
