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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComent, setIsLoadingComent] = useState(false);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const loadedComments = await getComments(id);

      setIsErrOnLoadCom('error' in loadedComments);
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
    const filteredComents = comments.filter(c => c.id !== commentId);

    setComments(filteredComents);

    try {
      await deleteComments(commentId);
    } catch {
      throw new Error('Don\'t delete comment');
    }
  };

  const onAddComment = async (newComment: Omit<Comment, 'id'>) => {
    try {
      setIsLoadingComent(true);
      const addedComment = await addComments(newComment);
      const newComents = [...comments, addedComment];

      setComments(newComents);
    } catch {
      throw new Error('Don\'t add comment');
    } finally {
      setIsLoadingComent(false);
    }
  };

  const isNoCommentYet = !comments.length && !isLoading
      && !isErrOnLoadCom;
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

          {isNoCommentYet && (

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
            postId={selectedPost.id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
