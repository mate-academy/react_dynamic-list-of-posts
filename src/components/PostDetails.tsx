/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
// import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deletePostComment, getPostComments } from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    getPostComments(id)
      .then(setComments);
  }, [id]);

  const handleDelete = (id: number) => {
    deletePostComment(id)
      .then(() => {
        setComments((prevComments: Comment[]) => {
          const copy = [...prevComments];
          const index = copy.findIndex(comment => comment.id === id);

          copy.splice(index, 1);

          return copy;
        });
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {/* <Loader /> */}

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div> */}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && comments.map(comment => (
            <>
              <p className="title is-4">Comments:</p>

              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  {comment.body}
                </div>
              </article>
            </>
          ))}

          {!formOpened && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formOpened && (
          <NewCommentForm
            postId={id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
