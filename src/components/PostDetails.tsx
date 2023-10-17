import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getCommentsByPostsId } from '../api/api';
import { IErrors } from '../types/IErrors';
import { client } from '../utils/fetchClient';

type Props = {
  currPost: Post | undefined;
  isError: boolean;
  setError: React.Dispatch<React.SetStateAction<IErrors>>;
  idOfOpenPost: number;
};

export const PostDetails: React.FC<Props> = ({
  currPost,
  isError,
  setError,
  idOfOpenPost,
}) => {
  const [isWriteComment, setIsWriteComment] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getComments = (postId: number) => {
    setIsLoading(true);

    getCommentsByPostsId(postId)
      .then((data) => setComments(data as Comment[]))
      .catch(() => {
        setError((prev) => ({
          ...prev,
          isCommetsEror: true,
        }));
      })
      .finally(() => setIsLoading(false));
  };

  const deleteComment = async (commentID: number) => {
    setIsLoading(true);

    setComments(comments.filter((comment) => comment.id !== commentID));

    try {
      await client.delete(`/comments/${commentID}`);
    } catch {
      setError((prev) => ({
        ...prev,
        isCommetsEror: true,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewComment = () => {
    setIsWriteComment(true);
  };

  useEffect(() => {
    getComments(idOfOpenPost);
  }, [idOfOpenPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${currPost?.id}: ${currPost?.title}`}</h2>

          <p data-cy="PostBody">{currPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map((comment) => (
            <article
              key={comment.id}
              className="message is-small"
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={comment.email} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => deleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment && (
          <NewCommentForm
            idOfOpenPost={idOfOpenPost}
            getComments={getComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
