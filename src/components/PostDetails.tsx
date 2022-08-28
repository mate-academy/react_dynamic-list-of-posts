import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const deleteComment = (commentId: number) => {
    const prevComments = [...comments];
    const filteredComments = comments.filter(({ id }) => id !== commentId);

    setComments(filteredComments);

    client.delete(`/comments/${commentId}`)
      .catch(() => setComments(prevComments));
  };

  useEffect(() => {
    setLoader(true);
    setShowForm(false);

    client.get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => {
        setError(false);
        setComments(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {loader ? <Loader /> : (
            <>
              {error ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              ) : (
                <>
                  {comments.length ? (
                    <>
                      <p className="title is-4">Comments:</p>

                      {comments.map(({
                        id,
                        email,
                        name,
                        body,
                      }) => (
                        <article
                          key={id}
                          className="message is-small"
                          data-cy="Comment"
                        >
                          <div className="message-header">
                            <a
                              href={`mailto:${email}`}
                              data-cy="CommentAuthor"
                            >
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
                    </>
                  ) : (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )}

                  {!showForm && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setShowForm(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {showForm && (
          <NewCommentForm
            postId={post.id}
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
