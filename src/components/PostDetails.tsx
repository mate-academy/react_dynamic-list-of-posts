import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from './Comment';
import { Post } from '../types/Post';
import { getComments } from '../api/comments';
import { CommentType } from '../types/CommentType';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = React.memo(({ selectedPost }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => setIsFormOpen(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        if (!selectedPost) {
          return;
        }

        const loadedComments = await getComments(selectedPost?.id);

        setComments(loadedComments);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
    setIsFormOpen(false);
  }, [selectedPost]);

  const commentsBlock = (
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
  );

  const noCommentsBlock = (
    !error && (
      <p
        className="title is-4"
        data-cy="NoCommentsMessage"
      >
        No comments yet
      </p>
    )
  );

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

        {isLoading
          ? <Loader />
          : (
            <>
              <div className="block">
                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {
                  comments.length
                    ? commentsBlock
                    : noCommentsBlock
                }

                {!isFormOpen && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={handleFormOpen}
                  >
                    Write a comment
                  </button>
                )}
              </div>
              {isFormOpen && (
                <NewCommentForm
                  selectedPost={selectedPost}
                  setComments={setComments}
                />
              )}
            </>
          )}
      </div>
    </div>
  );
});
