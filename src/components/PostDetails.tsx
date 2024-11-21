import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const loadComments = (postId: number) => {
    setLoading(true);
    setError('');

    getPostComments(postId)
      .then(fetchedComments => {
        setComments(fetchedComments);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCurrComment = (id: number) => {
    const previousComments = [...comments];

    setComments(curr => curr.filter(comment => comment.id !== id));

    deleteComment(id).catch(() => {
      setComments(previousComments);
      setError('Failed to delete the comment');
    });
  };

  useEffect(() => {
    if (post) {
      loadComments(post.id);
      setOpenForm(false);
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !loading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && !!comments.length && !error && (
            <p className="title is-4">Comments:</p>
          )}

          {!loading &&
            !error &&
            !!comments.length &&
            comments.map(comment => (
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
                    onClick={() => deleteCurrComment(comment.id)}
                  ></button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!loading && !error && !openForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openForm && <NewCommentForm post={post} setComments={setComments} />}
      </div>
    </div>
  );
};
