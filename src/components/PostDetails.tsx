import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/fetchPosts';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsFormOpen(false);
  }, [post]);

  useEffect(() => {
    if (post?.id !== undefined) {
      const fetchComments = async () => {
        setIsLoading(true);

        try {
          const comments = await getComments(post.id);

          setCommentsList(comments);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchComments();
    }
  }, [post?.id]);

  const deleteCommentInList = (commentId: number | undefined) => {
    setCommentsList(commentsList.filter(c => c.id !== commentId));

    deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post?.id}: {post?.title}
        </h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}
        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}{' '}
        {!isLoading && commentsList.length === 0 && !isError && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoading && commentsList.length > 0 && !isError && (
          <>
            <p className="title is-4">Comments:</p>
            {commentsList.map(currentComment => (
              <article
                key={currentComment?.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${currentComment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {currentComment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteCommentInList(currentComment?.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {currentComment.body}
                </div>
              </article>
            ))}
          </>
        )}
        {!isLoading && !isFormOpen && !isError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormOpen && !isError && (
        <NewCommentForm
          post={post}
          setCommentsList={setCommentsList}
          commentsList={commentsList}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};
