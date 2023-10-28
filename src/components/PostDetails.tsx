import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentItem } from './CommentItem';
import { getComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);

  const getCommentsFunction = async (postId: number) => {
    try {
      setComments(await getComments(postId));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setFormIsActive(false);

    getCommentsFunction(post.id);
  }, [post]);

  const deleteCommentFunction = useCallback(async (commentId: number) => {
    setComments(currentComments => currentComments
      .filter(currComment => currComment.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading
            ? <Loader />
            : (
              <>
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {!isLoading && !isError && !comments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!isLoading && !isError && !!comments.length && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {
                      comments.map(comment => (
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          deleteCommentFunction={deleteCommentFunction}
                        />
                      ))
                    }
                  </>
                )}

                {!isLoading && !isError && !formIsActive && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    // onClick={toggleFormActive}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
