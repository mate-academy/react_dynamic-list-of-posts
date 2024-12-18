import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getData } from '../api/fetch';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
}

export const PostDetails: React.FC<Props> = ({ posts, selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    if (posts && selectedPost) {
      const fetchComments = async () => {
        try {
          const url = `/comments?postId=${selectedPost.id}`;

          setLoading(true);

          if (selectedPost) {
            setLoadingError(false);

            const currentComments = await getData<Comment>(url);

            setComments(currentComments);
          }
        } catch {
          setLoadingError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchComments();
    }
  }, [posts, selectedPost]);

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const updatedComments = comments.filter(comment => comment.id !== id);

    setComments(updatedComments);

    try {
      await client.delete(`/comments/${id}`);
    } catch (error) {
      const deletedComment = comments.find(comment => comment.id === id);

      if (deletedComment) {
        setTimeout(() => {
          setComments([...updatedComments, deletedComment]);
          setLoadingError(true);

          setTimeout(() => {
            setLoadingError(false);
          }, 1000);
        }, 1000);
      }
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {loadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !loading && !loadingError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

          {comments.map(comment => {
            const { name, email, body } = comment as CommentData;

            return (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
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
                    onClick={() => {
                      handleDelete(comment.id);
                    }}
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

          {!showForm && !loading && !loadingError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (
          <NewCommentForm
            setComments={setComments}
            selectedPost={selectedPost as Post}
            setLoadingError={setLoadingError}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};
