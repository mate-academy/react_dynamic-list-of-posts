import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: null | Post;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // const [isLoadingForDelete, setIsLoadingForDelete] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const findComments = async () => {
      setIsLoading(true);
      setShowForm(false);

      try {
        const currentComments = await client.get(
          `/comments?postId=${selectedPost?.id}`,
        );

        setComments(currentComments);
      } catch {
        setError(`Can't download post`);
      } finally {
        setIsLoading(false);
      }
    };

    findComments();
  }, [selectedPost]);

  const handleDeleteComment = async com => {
    setIsLoading(true);
    setComments(prev => prev.filter(c => c.id !== com.id));

    try {
      await client.delete(`/comments/${com.id}`);
    } catch {
      setError(`Can't delete a comment`);
      setComments(prev => [...prev, comm]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!isLoading &&
            comments.length > 0 &&
            !error &&
            comments.map(com => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={com.id}
              >
                <div className="message-header">
                  <a href={`mailto:${com.email}`} data-cy="CommentAuthor">
                    {com.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(com)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {com.body}
                </div>
              </article>
            ))}

          {!isLoading && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !error && !showForm && (
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

        {selectedPost && (
          <NewCommentForm
            // comments={comments}
            setComments={setComments}
            selectedPost={selectedPost}
            showForm={showForm}
            // setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};
