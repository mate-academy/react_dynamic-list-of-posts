import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComments, getComments } from '../api/api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  postId: number,
  posts: Post[] | null,
};

export const PostDetails: React.FC<Props> = ({ postId, posts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments]
    = useState<Comment[] | null>(null);
  const [postError, setPostError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isWriteClicked, setIsWriteClicked] = useState(false);

  const post = posts?.find(item => item.id === postId);

  useEffect(() => {
    setPostError(false);
    setIsLoading(true);

    getComments(postId)
      .then(setComments)
      .catch(() => {
        setPostError(true);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const removeComment = (id: number) => {
    setIsLoading(true);

    deleteComments(id)
      .then(() => {
        const index = comments?.findIndex(elem => elem.id === id);

        if (index && index !== -1 && comments) {
          const newComments = [...comments];

          newComments.splice(index, 1);
          setComments(newComments);
        }
      })
      .catch(() => {
        setPostError(true);
      })
      .finally(() => setIsLoading(false));
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
          {isLoading && <Loader />}

          {(postError || commentError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments?.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
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
                  onClick={() => removeComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isWriteClicked && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteClicked(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteClicked && (
          <NewCommentForm
            setComments={setComments}
            POST_ID={postId}
            setCommentError={setCommentError}
            comments={comments}
          />
        )}
      </div>
    </div>
  );
};
