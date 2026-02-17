import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../api/api';
import { Comment } from '../types/Comment';
import { CommentDetails } from './CommentDetails';

type Props = {
  post: Post;
  isFormOpen: boolean;
  isButtonVisible: boolean;
  handleFormOpen: () => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isFormOpen,
  isButtonVisible,
  handleFormOpen,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setPostLoading(true);

    getPostComments(post.id)
      .then((data: Comment[]) => {
        setComments(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPostLoading(false);
      });
  }, [post]);

  const handleDeleteComment = async (comment: Comment) => {
    setComments(prevComments =>
      prevComments.filter(currComment => comment.id !== currComment.id),
    );

    try {
      await deleteComment(comment.id);
    } catch (err) {
      setComments(prevComments => [...prevComments, comment]);
      throw err;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {postLoading && <Loader />}

        {!postLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!postLoading && !error && (
          <>
            {comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
            {comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <CommentDetails
                    key={comment.id}
                    comment={comment}
                    handleDelete={handleDeleteComment}
                  />
                ))}
              </>
            )}
            {isButtonVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleFormOpen}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm
          postId={post.id}
          setComments={setComments}
          setIsError={setError}
        />
      )}
    </div>
  );
};
