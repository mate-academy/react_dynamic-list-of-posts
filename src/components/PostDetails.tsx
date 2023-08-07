import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toShowForm, setToShowForm] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setToShowForm(false);
    setIsLoading(true);

    client.get<Comment[]>(`/comments?postId=${post.id}`)
      .then((fetchComments) => setComments(fetchComments))
      .catch((error) => setErrorMsg(error.message))
      .finally(() => setIsLoading(false));
  }, [post?.id, post?.userId]);

  const handleDeleteComment = (comment: Comment) => {
    if (!comments) {
      return;
    }

    setComments(comments.filter((c) => c.id !== comment.id));

    client.delete(`/comments/${comment.id}`)
      .catch((error) => setErrorMsg(error.message));
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
          {isLoading && (<Loader />)}

          {errorMsg && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMsg}
            </div>
          )}

          {comments?.length === 0 && !isLoading && !errorMsg && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments?.length > 0 && !isLoading && !errorMsg && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment)}
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

          {!toShowForm && !isLoading && !errorMsg && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setToShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {toShowForm && (
          <NewCommentForm
            selectedPostId={post?.id}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
