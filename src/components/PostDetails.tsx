import React, { useCallback, useEffect, useState } from 'react';
import * as commentsService from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment as CommentItem } from '../types/Comment';
import { Post } from '../types/Post';
import Comment from './Comment';

type Props = {
  selectedPost: Post;
};
export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const getAllComments = await commentsService.getComments(
          selectedPost.id,
        );

        setComments(getAllComments);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedPost]);

  useEffect(() => {
    setIsAddingComment(false);
  }, [selectedPost]);

  const addNewComment = useCallback((newComment: CommentItem) => {
    setComments(prevComments => [...prevComments, newComment]);
  }, []);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      await commentsService.deleteComment(commentId);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && !isLoading && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!comments.length && !isError && !isLoading && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!!comments.length && !isLoading && !isError && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </>
        )}

        {!isLoading && !isError && !isAddingComment && (
          <button
            onClick={() => setIsAddingComment(true)}
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        )}
      </div>

      {isAddingComment && (
        <NewCommentForm
          postId={selectedPost.id}
          addNewComment={addNewComment}
          setIsError={setIsError}
          setIsAddingComment={setIsAddingComment}
        />
      )}
    </div>
  );
};
