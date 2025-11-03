import { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Load } from '../types/Load';
import { ErrorType } from '../types/ErrorType';

type Props = {
  selectedPost: Post;
  comments: Comment[] | [];
  loading: Load;
  error: ErrorType;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  loading,
  error,
  setComments,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost]);

  const handleDeleteComment = (id: number) => {
    if (comments) {
      const newComments = comments.filter(comm => comm.id !== id);

      setComments(newComments);

      client.delete(`/comments/${id}`).catch(() => {
        setComments(comments);
        alert("Something went wrong, try again later!");
      });
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading === Load.Comments && <Loader />}

        {error === ErrorType.FetchComments && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.length === 0 &&
          loading !== Load.Comments &&
          error !== ErrorType.FetchComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {comments.length > 0 &&
          loading !== Load.Comments &&
          error !== ErrorType.FetchComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comm => {
                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comm.id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${comm.email}`} data-cy="CommentAuthor">
                        {comm.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comm.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comm.body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

        {!showForm && !loading && error !== ErrorType.FetchComments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && (
        <NewCommentForm setComments={setComments} selectedPost={selectedPost} />
      )}
    </div>
  );
};
