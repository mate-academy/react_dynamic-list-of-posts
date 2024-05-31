import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments, onCommentDelete } from '../api/posts';

type Props = {
  post: Post;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: (errorMessage: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isLoading,
  setIsLoading,
  setErrorMessage,
}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setVisibleForm(false);

    getComments(post.id)
      .then(setComments)
      .catch(() => setPostErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [post, setIsLoading]);

  const AddComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  const DeleteComment = (commentId: number) => {
    onCommentDelete(commentId)
      .then(() =>
        setComments(currentComments =>
          currentComments.filter(c => c.id !== commentId),
        ),
      )
      .catch(() => setPostErrorMessage('Something went wrong!'));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {postErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {postErrorMessage}
            </div>
          )}

          {comments.length === 0 && !isLoading && !postErrorMessage ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
                      onClick={() => DeleteComment(comment.id)}
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

          {!isLoading && !visibleForm && !postErrorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisibleForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {visibleForm && (
          <NewCommentForm
            postId={post.id}
            addComment={AddComment}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
