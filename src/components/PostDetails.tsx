import React, { useEffect, useState } from 'react';
import { deleteComment, getAllComments } from '../utils/fetchClient';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [DeletingComment, setDeletingComment] = useState<Comment | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = async () => {
    if (!post) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getAllComments(post.id);

      setComments(response);
    } catch (e) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const onCommentDelete = async (comment: Comment) => {
    setDeletingComment(comment);

    try {
      await deleteComment(comment?.id);

      setComments(comments
        .filter(commentItem => commentItem.id !== comment.id));
    } catch (e) {
      setIsError(true);
    }

    setDeletingComment(null);
  };

  useEffect(() => {
    getComments();
  }, [post]);

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
          {isLoading && (
            <Loader />
          )}

          {!isLoading && isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onCommentDelete(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    { DeletingComment?.id === comment.id
                      ? (
                        <Loader />
                      ) : comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpened(!isFormOpened)}
          >
            {isFormOpened ? ('Discard comment') : ('Write a comment')}
          </button>
        </div>

        {isFormOpened && post && (
          <NewCommentForm
            postId={post.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
