import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../utils/api';

interface Props {
  post: Post,
}

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const [commentsFromServer, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [hasOpenForm, setOpenForm] = useState(false);
  const [loadingErrorNotice, setLoadingErrorNotice] = useState('');
  const hasLoadingError = !!loadingErrorNotice;

  const loadComments = async (postId: number) => {
    setLoadingErrorNotice('');
    try {
      setLoading(true);
      setOpenForm(false);
      const comments = await getComments(postId);

      setComments(comments);
    } catch (error) {
      setLoadingErrorNotice('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setLoadingErrorNotice('');
    if (commentsFromServer) {
      const immediatelyDelete = commentsFromServer.filter(comment => (
        comment.id !== commentId));

      setComments(immediatelyDelete);
    }

    try {
      await deleteComment(commentId);
    } catch (error) {
      setLoadingErrorNotice('Unable to delete comment, please try again');
      setComments(commentsFromServer);
    }
  };

  useEffect(() => {
    loadComments(post.id);
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
        {isLoading ? <Loader />
          : (
            <div className="block">

              {hasLoadingError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {loadingErrorNotice}
                </div>
              )}

              {commentsFromServer?.length === 0
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )
                : <p className="title is-4">Comments:</p>}
              {commentsFromServer?.map(comment => (
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
                    {/* {'Multi\nline\ncomment'} */}
                  </div>
                </article>
              ))}

              {!hasOpenForm && (
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
          )}

        {hasOpenForm && (
          <NewCommentForm
            postId={post.id}
            updateComments={setComments}
            setLoadingErrorNotice={setLoadingErrorNotice}
          />
        )}
      </div>
    </div>
  );
});
