import React, { useState, useMemo, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface T {
  selectedPost: Post
}

export const PostDetails: React.FC<T> = ({
  selectedPost,
}) => {
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [userCommentsError, setUserCommentsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  useEffect(() => {
    fetch(`https://mate.academy/students-api/comments?postId=${selectedPost.id}`)
      .then(response => {
        setIsOpenCom(false);
        setIsLoading(true);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(setUserComments)
      .catch(() => setUserCommentsError(true)) // () => setUserCommentsError('error');
      .finally(() => {
        setIsDeleted(false);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [selectedPost]);

  useMemo(() => {
    fetch(`https://mate.academy/students-api/comments?postId=${selectedPost.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(setUserComments)
      .catch(() => setUserCommentsError(true)) // () => setUserCommentsError('error');
      .finally(() => {
        setIsDeleted(false);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [isDeleted, isCommentLoading]);

  const deleteComment = async (comId: number) => {
    const comToDelete = userComments.find(com => com.id === comId);

    try {
      if (comToDelete) {
        await client.delete(`/comments/${comToDelete.id}`);
      } else {
        throw new Error('error');
      }
    } catch {
      setUserCommentsError(true);
    } finally {
      setIsDeleted(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        {isLoading ? <Loader />
          : (
            <>
              <div className="block">
                {userCommentsError && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {userComments.length === 0 && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                <p className="title is-4">Comments:</p>

                {userComments.map((com: Comment) => (
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
                        onClick={() => deleteComment(com.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {com.body}
                    </div>
                  </article>
                ))}
              </div>

              {!isOpenCom ? (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsOpenCom(true)}
                >
                  Write a comment
                </button>
              ) : (
                <NewCommentForm
                  selectedPost={selectedPost}
                  setIsLoading={setIsCommentLoading}
                  isLoading={isCommentLoading}
                />
              )}
            </>
          )}

      </div>
    </div>
  );
};
