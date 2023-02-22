import React, { useEffect, useState } from 'react';
import { getComments, deleteComments, addComments } from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';

type Props = {
  selectedPost: Post;
  isNewCommentFormOpened: boolean;
  onNewCommentFormOpened: () => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  onNewCommentFormOpened,
  isNewCommentFormOpened,
}) => {
  const { id, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isErrOnLoadCom, setIsErrOnLoadCom] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingComent, setIsLoadingComent] = useState<boolean>(false);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const loadedComments = await getComments(id);

      setComments(loadedComments);
    } catch {
      setIsErrOnLoadCom(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [id]);

  const removeComment = async (commentId: number) => {
    const filteredComents = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(filteredComents);

    try {
      await deleteComments(commentId);
    } catch {
      throw new Error('Error while deleting');
    }
  };

  const onAddComment = async (newComment: Omit<Comment, 'id'>) => {
    try {
      setIsLoadingComent(true);
      const addedComment = await addComments(newComment);
      const newComents = [...comments, addedComment];

      setComments(newComents);
    } catch {
      throw new Error('Error adding comment');
    } finally {
      setIsLoadingComent(false);
    }
  };

  const hasComment = !isLoading && !isErrOnLoadCom && !comments.length;
  const isWriteBtnVisible = !isErrOnLoadCom
    && !isLoading && !isNewCommentFormOpened;

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
          {isLoading && <Loader />}

          {isErrOnLoadCom && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          { comments.length > 0 && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  comment={comment}
                  key={comment.id}
                  deleteComment={removeComment}
                />
              ))}
            </>
          )}

          {isWriteBtnVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={onNewCommentFormOpened}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentFormOpened && (
          <NewCommentForm
            isLoadingComent={isLoadingComent}
            postId={id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
