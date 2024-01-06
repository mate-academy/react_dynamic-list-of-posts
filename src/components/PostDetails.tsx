import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../services/comment';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [writeComment, setWriteComment] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [errorMessageComments, setErrorMessageComments] = useState<string>('');
  const [commentsPost, setCommentsPost] = useState<Comment[]>([]);

  const loadComment = () => {
    setIsLoadingComments(true);

    getComments(selectedPost.id)
      .then(setCommentsPost)
      .catch(error => {
        setErrorMessageComments('Something went wrong!');
        throw error;
      })
      .finally(() => {
        setIsLoadingComments(false);
      });

    setWriteComment((current) => {
      if (!current) {
        return true;
      }

      return current;
    });
  };

  useEffect(loadComment, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    setErrorMessageComments('');
    setCommentsPost(
      commentsPost.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId)
      .catch((error) => {
        setErrorMessageComments('Unable to delete a comment');
        throw error;
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (<Loader />)}

          {errorMessageComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessageComments}
            </div>
          )}

          {!commentsPost.length && !isLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {commentsPost.map(comment => (
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
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>

          ))}

          {writeComment && !isLoadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteComment(false)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!writeComment && !isLoadingComments && (
          <NewCommentForm
            selectedPost={selectedPost}
            commentsPost={commentsPost}
            setCommentsPost={setCommentsPost}
            setErrorMessageComments={setErrorMessageComments}
          />
        )}
      </div>
    </div>
  );
};
