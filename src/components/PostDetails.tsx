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

  const loadComments = async (postId: number) => {
    try {
      setLoadingErrorNotice('');
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
    try {
      setLoadingErrorNotice('');
      if (commentsFromServer) {
        const immediatelyDelete = commentsFromServer.filter(comment => (
          comment.id !== commentId));

        setComments(immediatelyDelete);
      }

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

              {!!loadingErrorNotice && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {loadingErrorNotice}
                </div>
              )}

              {!commentsFromServer?.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )
                : <p className="title is-4">Comments:</p>}
              {commentsFromServer?.map(comment => {
                const {
                  email, name, id, body,
                } = comment;

                return (
                  <article
                    key={id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}

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
