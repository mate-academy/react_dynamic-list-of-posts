import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentInform } from './CommentInform';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const { id, title, body } = post;

  const removeComment = (commentId: number) => {
    setComments(currentComents =>
      currentComents.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setComments(comments);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setComments([]);
    setIsForm(false);

    getPostComments(id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isError && isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentInform
                  key={comment.id}
                  comment={comment}
                  onDelete={removeComment}
                />
              ))}
            </>
          )}

          {!isForm && isError && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && <NewCommentForm postId={id} updateComent={setComments} />}
      </div>
    </div>
  );
};
