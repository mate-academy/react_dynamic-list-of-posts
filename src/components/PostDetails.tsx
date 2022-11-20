import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { createComment } from '../api/comments';
import { Comments } from './Comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const PostDetails: React.FC<Props> = ({
  post, comments, isLoading, hasError, setComments,
}) => {
  const { id, title } = post;
  const [isExistForm, setIsExistForm] = useState(false);

  useEffect(() => {
    setIsExistForm(false);
  }, [post]);

  const addComment = async (
    name: string, email: string, body: string, postId: number,
  ) => {
    try {
      const newComment = await createComment(
        name,
        email,
        body,
        postId,
      );

      setComments(currentComments => [...currentComments, newComment]);
    } catch (error) {
      throw new Error('Unable to create new comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && comments && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && !hasError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0
          && <Comments comments={comments} setComments={setComments} />}

          {!isExistForm && !isLoading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsExistForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isExistForm && <NewCommentForm addComment={addComment} postId={id} />}
      </div>
    </div>
  );
};
