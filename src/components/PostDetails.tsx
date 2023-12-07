import React, { useState, useMemo } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface PostDetailsType {
  selectedPost: Post
}

export const PostDetails: React.FC<PostDetailsType> = ({
  selectedPost,
}) => {
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [userCommentsError, setUserCommentsError] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const url = `https://mate.academy/students-api/comments?postId=${selectedPost.id}`;

  useMemo(() => {
    fetch(`${url}`)
      .then(response => {
        setIsOpenCom(false);
        setIsLoading(true);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(setUserComments)
      .catch(() => setUserCommentsError(true))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [url]);

  const deleteComment = async (comId: number | undefined) => {
    const comToDelete = userComments.find(com => com.id === comId);

    try {
      if (comToDelete) {
        await client.delete(`/comments/${comToDelete.id}`);

        setUserComments((prev) => (
          prev.filter(com => com.id !== comId)
        ));
      } else {
        throw new Error('error');
      }
    } catch {
      setUserCommentsError(true);
    }
  };

  const handleOpenComment = () => {
    setIsOpenCom(true);
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

                {!userComments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                <p className="title is-4">Comments:</p>

                {userComments.map(({
                  id,
                  name,
                  email,
                  body,
                }) => (
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
                        onClick={() => deleteComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                ))}
              </div>

              {!isOpenCom ? (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleOpenComment}
                >
                  Write a comment
                </button>
              ) : (
                <NewCommentForm
                  selectedPost={selectedPost}
                  setIsLoading={setIsCommentLoading}
                  isLoading={isCommentLoading}
                  setUserComments={setUserComments}
                />
              )}
            </>
          )}

      </div>
    </div>
  );
};
