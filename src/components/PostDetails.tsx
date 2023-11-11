import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../Services/services';

type Props = {
  selectedPost: Post | null,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentButton, setCommentButton] = useState(true);

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);

      getComments(selectedPost.id)
        .then(setPostComments)
        .catch(() => {
          setErrorMessage('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setCommentButton(true);
  }, [selectedPost]);

  const handleDelete = (commentId: number) => {
    setPostComments(currentComments => currentComments
      .filter(com => com.id !== commentId));
    deleteComment(commentId)
      .catch(() => {
        setPostComments(postComments);
        setErrorMessage('Unable to delete a comment');
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {loading && (
            <Loader />
          )}

          {!loading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!loading && !errorMessage && postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {postComments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
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

          {!loading && commentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCommentButton(!commentButton)}
            >
              Write a comment
            </button>

          )}
        </div>
        {selectedPost && !loading && !commentButton && (
          <NewCommentForm
            postComments={postComments}
            setPostComments={setPostComments}
            setErrorMessage={setErrorMessage}
            selectedPostId={selectedPost.id}
          />
        )}

      </div>
    </div>
  );
};
