import { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deletePostComment, getPostComment } from '../api/user';

interface PostDetailsProps {
  selectedPost: Post;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  isFormOpen,
  setIsFormOpen,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  const loadComment = async () => {
    setIsLoading(true);

    try {
      const fetchedComment = await getPostComment(selectedPost.id);

      setComments(fetchedComment);
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComment();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deletePostComment(commentId);
      setComments(prev => prev?.filter(c => c.id !== commentId) || []);
    } catch {
      setErrorMessage(true);
    }
  };

  const noComments = comments?.length === 0 && !isLoading && !errorMessage;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isLoading && comments && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
              {!isFormOpen && !errorMessage && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsFormOpen(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
        {isFormOpen && (
          <NewCommentForm
            setComments={setComments}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
