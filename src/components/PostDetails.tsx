import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/api';

type Props = {
  userPost: Post | null;
  isFormVisible: boolean;
  setIsFormVisible: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  userPost,
  isFormVisible,
  setIsFormVisible,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadComments = async () => {
      if (!userPost) {
        return;
      }

      setIsFormVisible(false);
      setIsLoading(true);
      setIsErrorShown(false);

      try {
        const comments = await getComments(userPost.id);

        setPostComments(comments);
      } catch {
        setIsErrorShown(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [userPost, setIsFormVisible]);

  const handleDeleteComment = async (commentId: number) => {
    const prevComments = postComments;

    setPostComments(current =>
      current.filter(comment => comment.id !== commentId),
    );
    setIsErrorShown(false);

    try {
      await deleteComment(commentId);
    } catch {
      setPostComments(prevComments);
      setIsErrorShown(true);
    }
  };

  if (!userPost) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{userPost.id}: {userPost.title}
          </h2>

          <p data-cy="PostBody">{userPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isErrorShown && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isErrorShown && !postComments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {postComments.length > 0 && <p className="title is-4">Comments:</p>}

          {postComments.map(comment => (
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

          {!isFormVisible && !isLoading && !isErrorShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            post={userPost}
            postComments={postComments}
            setPostComments={setPostComments}
            setIsErrorShown={setIsErrorShown}
          />
        )}
      </div>
    </div>
  );
};
