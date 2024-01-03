import { useState, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getComments, deleteComment } from '../utils/commentService';
import { usePosts } from './PostsProvider';

export const PostDetails = () => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [writeCommentButton, setWriteCommentButton] = useState(true);

  const { selectedPost } = usePosts();

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);

      getComments(selectedPost.id)
        .then(setPostComments)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    }

    setWriteCommentButton((current) => {
      if (!current) {
        return true;
      }

      return current;
    });
  }, [selectedPost]);

  const handleDelete = (commentId: number) => {
    setErrorMessage('');
    setPostComments(
      postComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId)
      .catch((error) => {
        setErrorMessage('Unable to delete a comment');
        throw error;
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

          {!loading && !errorMessage && !postComments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && !!postComments.length && (
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

          {!loading && writeCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteCommentButton(!writeCommentButton)}
            >
              Write a comment
            </button>
          )}
        </div>

        {selectedPost && !loading && !writeCommentButton && (
          <NewCommentForm
            postComments={postComments}
            setPostComments={setPostComments}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
