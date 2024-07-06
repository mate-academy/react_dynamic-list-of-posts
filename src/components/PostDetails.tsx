import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentInfo } from './CommentInfo';
import { deleteComment, getPostsComments } from '../utils/fetchClient';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { title, body, id } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);
    setComments([]);
    setIsFormActive(false);

    getPostsComments(id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  function onDelete(commentId: number) {
    deleteComment(commentId).then(() => {
      setComments(currComments =>
        currComments.filter(comment => comment.id !== commentId),
      );
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !loading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentInfo
                  comment={comment}
                  key={comment.id}
                  onDelete={onDelete}
                />
              ))}
            </>
          )}

          {!isFormActive && !loading && !error && (
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
            postId={id}
            updateComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
