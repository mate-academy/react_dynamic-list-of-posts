import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { useEffect, useState } from 'react';
import { getPostComments, deleteComment } from '../api/comment';

interface Prop {
  selectedPost: Post | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const PostDetails: React.FC<Prop> = ({
  selectedPost,
  isLoading,
  setIsLoading,
  setErrorMessage,
}) => {
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');

  const deleteOnClick = (commentId: number) => {
    deleteComment(commentId)
      .then(() => setComments(prev => prev.filter(c => c.id !== commentId)))
      .catch(() => setCommentsError('Failed to delete comment'));
  };

  useEffect(() => {
    setCommentsError('');
    setIsLoading(true);
    setIsLoadingComments(true);

    if (!selectedPost) {
      return;
    }

    getPostComments(selectedPost.id)
      .then(comm => setComments(comm))
      .catch(() => setCommentsError('Unable to load comments'))
      .finally(() => {
        setIsLoading(false);
        setIsLoadingComments(false);
      });
  }, [selectedPost, setIsLoading]);

  useEffect(() => {
    setOpenCommentForm(false);
  }, [selectedPost]);

  /* eslint-disable prettier/prettier */
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block" key={selectedPost?.id}>
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>
          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {commentsError && !isLoadingComments && (
            <p className="title is-4" data-cy="CommentsError">
              {commentsError}
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const { id, name, email, body } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => deleteOnClick(comment.id)}
                      >
                        delete button
                      </button>
                    </div>
                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isLoading &&
            !isLoadingComments &&
            !commentsError &&
            comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
            </p>
          )}

          {!openCommentForm && !isLoading && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openCommentForm && (
          <NewCommentForm
            selectedPost={selectedPost}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
            setOpenCommentForm={setOpenCommentForm}
            onAddComment={newComment =>
              setComments(prev => [...prev, newComment])
            }
          />
        )}
      </div>
    </div>
  );
};
