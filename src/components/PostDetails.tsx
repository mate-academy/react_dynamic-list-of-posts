import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { deleteComment, postComment } from '../api/services';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  loading: boolean;
  error: boolean;
  // setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  loading,
  error,
  setComments,
}) => {
  const [createComment, setCreateComment] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  // const [errorComment, setErrorComment] = useState(false);

  const createNewComment = async (commentData: CommentData) => {
    const data: Comment = {
      postId: selectedPost?.id || 0,
      ...commentData,
    };

    try {
      setButtonLoad(true);
      // setErrorComment(false);
      const newComment: Comment = await postComment(data);

      setComments(prev => [
        ...prev,
        newComment,
      ]);
    } catch {
      // setErrorComment(true);
    } finally {
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    if (selectedPost?.id) {
      setCreateComment(true);
    } else {
      setCreateComment(false);
    }
  }, [selectedPost]);

  const handleClick = () => {
    setCreateComment(prev => !prev);
  };

  const removeComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch {
      throw new Error('Error');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {loading && (
            <Loader />
          )}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(selectedPost && !loading && !error) && (
            <>
              {comments?.length > 0 ? (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
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
                          onClick={() => removeComment(comment.id || 0)}
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
              ) : (
                <>
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                </>
              )}

              {createComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleClick}
                >
                  Write a comment
                </button>
              )}
            </>
          )}

        </div>

        {!createComment && (
          <NewCommentForm
            createNewComment={createNewComment}
            buttonLoad={buttonLoad}
            error={error}
          />
        )}

      </div>
    </div>
  );
};
