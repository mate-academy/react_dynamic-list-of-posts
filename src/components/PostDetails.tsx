import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments, deleteComment } from '../api/posts';

type Props = {
  activePost: Post,
};

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const [isFindComments, setIsFindComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const getPostComments = async (post: Post) => {
    setIsError(false);
    setIsFindComments(true);

    try {
      const response = await getComments(post.id);

      setPostComments(response);

      setIsFindComments(false);
    } catch {
      setIsFindComments(false);
      setIsError(true);
    }

    setIsFindComments(false);
  };

  const removeComment = async (comment: Comment) => {
    setPostComments(
      postComments.filter(activeComment => activeComment.id !== comment.id),
    );

    deleteComment(comment.id, activePost.id);
  };

  useEffect(() => {
    setPostComments([]);
    setIsFormActive(false);
    getPostComments(activePost);
  }, [activePost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${activePost.id}: ${activePost.title}`}
          </h2>

          <p data-cy="PostBody">
            {activePost.body}
          </p>
        </div>

        <div className="block">
          {isFindComments && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(postComments.length < 1 && !isFindComments && !isError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!isFindComments && !isError && postComments.length > 0) && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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
                      onClick={() => removeComment(comment)}
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

          {(!isFindComments && !isError && !isFormActive) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm
            activePostId={activePost.id}
            postComments={postComments}
            setPostComments={comment => setPostComments(comment)}
          />
        )}
      </div>
    </div>
  );
};
