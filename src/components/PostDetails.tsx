import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostInt } from '../types/PostInt';
import { getPostComments } from '../utils/RESTmethods';
import { CommentInt } from '../types/CommentInt';
import { Comment } from './Comment';

type PostDetailProps = {
  selectedPost: PostInt,
};

export const PostDetails: React.FC<PostDetailProps> = ({
  selectedPost,
}) => {
  const { id, body, title } = selectedPost;
  const [comments, setComments] = useState<CommentInt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCommentWriting = () => setIsWritingComment(!isWritingComment);

  useEffect(() => {
    setIsLoading(true);
    setIsWritingComment(false);

    getPostComments(id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {`${body}`}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  setComments={setComments}
                />
              ))}
            </>
          )}

          {!isLoading && !isError && !isWritingComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => handleCommentWriting()}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isLoading && isWritingComment && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
