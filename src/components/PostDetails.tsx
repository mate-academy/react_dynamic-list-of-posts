import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../utils/serverHelper';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [isVisibleCommentError, setIsVisibleCommentError] = useState(false);
  const [isVisibleEmptyCommentMessage,
    setIsVisibleEmptyCommentMessage] = useState(false);

  const loadComments = async () => {
    // setComments([]);
    if (post === null) {
      return;
    }

    setIsVisibleLoader(true);
    setIsVisibleEmptyCommentMessage(false);
    setIsVisibleComments(false);

    try {
      const commentsFromServer = await getComments(post.id);

      setComments(commentsFromServer);
      setIsVisibleCommentError(false);
      if (commentsFromServer.length === 0) {
        setIsVisibleEmptyCommentMessage(true);
      } else {
        setIsVisibleComments(true);
      }
    } catch {
      setIsVisibleCommentError(true);
    } finally {
      setIsVisibleLoader(false);
    }
  };

  // useEffect(() => {
  //   loadComments();
  // }, [post]);

  useEffect(() => {
    loadComments();
  }, [post]);

  const handleOnDelete = async (id: number) => {
    if (post === null) {
      return;
    }

    try {
      await deleteComment(id);
      const preparedComments = comments.filter(comment => comment.id !== id);

      if (preparedComments.length === 0) {
        setIsVisibleEmptyCommentMessage(true);
        setIsVisibleComments(false);
      }

      setComments(preparedComments);

      // await getPosts(post.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isVisibleLoader && <Loader />}

          {isVisibleCommentError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong!
            </div>
          )}

          {isVisibleEmptyCommentMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isVisibleComments && (
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
                      onClick={() => {
                        handleOnDelete(comment.id);
                      }}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>

                </article>
              ))}

            </>
          )}

        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
