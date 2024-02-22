import { useEffect, useState } from 'react';
import { Comment, Post } from '../types';
import * as request from '../api/request';
import { Loader } from './Loader';
import { CommentInfo } from './CommentInfo';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasAddForm, setHasAddForm] = useState(false);
  const { id, title, body } = post;

  useEffect(() => {
    setHasAddForm(false);
    setIsLoading(true);

    request.getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(el => el.id !== commentId));

    request.deletePostComment(commentId);
  };

  const noComments = !comments.length && !hasError && !isLoading;
  const hasComments = !!comments.length && !hasError && !isLoading;

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

          {hasError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentInfo
                  key={comment.id}
                  comment={comment}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
        </div>

        {!hasAddForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setHasAddForm(true)}
          >
            Write a comment
          </button>
        )}

        {hasAddForm && (
          <NewCommentForm
            setComments={setComments}
            postId={post.id}
          />
        )}
      </div>
    </div>
  );
};
