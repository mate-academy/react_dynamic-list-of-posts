import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);

  const getCommentsfunc = async (postId: number) => {
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

    getCommentsfunc(post.id);
  }, [post]);

  const toggleFormActive = () => setFormIsActive(true);

  const addComment = useCallback(async (
    email: string,
    body: string,
    name: string,
    postId: number,
  ) => {
    const newComment: Omit<Comment, 'id'> = {
      email,
      body,
      name,
      postId,
    };

    return createComment(newComment)
      .then(currComment => {
        setComments(currentComments => [...currentComments, currComment]);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

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

                {/* eslint-disable-next-line no-extra-boolean-cast */}
                {!isLoading && !isError && !!!comments.length && (
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
                    onClick={toggleFormActive}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
        </div>

        {formIsActive
          && (
            <NewCommentForm
              addComment={addComment}
              postId={post.id}
            />
          )}
      </div>
    </div>
  );
};
