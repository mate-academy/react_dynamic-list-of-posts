import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as CommentService from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  currentPost: Post;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  isLoading: boolean;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  setErrorMessage,
  setIsLoading,
  isLoading,
  errorMessage,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [writeCommentBtn, setWriteCommentBtn] = useState<boolean>(false);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    setInputBody('');
    setInputEmail('');
    setInputName('');
    setWriteCommentBtn(false);
  }, [currentPost]);

  useEffect(() => {
    setIsLoading(true);
    CommentService.getComments(currentPost.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPost?.id, setErrorMessage, setIsLoading]);

  const handleAddComment = (data: CommentData) => {
    const { name, email, body } = data;

    setLoadingComments(true);

    if (currentPost) {
      CommentService.addComment({ ...data, postId: currentPost.id })
        .then(newComment => {
          setComments(currentComment => [...currentComment, newComment]);
          setInputBody('');
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
          setInputBody(body);
          setInputEmail(email);
          setInputName(name);
        })
        .finally(() => {
          setLoadingComments(false);
        });
    }
  };

  const handleDeleteComment = (commentId: number) => {
    CommentService.deleteComment(commentId)
      .then(() => {
        setComments(currentComment =>
          currentComment.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{currentPost.id}: {currentPost.title}
          </h2>

          <p data-cy="PostBody">{currentPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!errorMessage && !isLoading && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && comments.length > 0 && (
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
            </>
          )}
          {!writeCommentBtn && !isLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteCommentBtn(true)}
            >
              Write a comment
            </button>
          )}

          {writeCommentBtn && (
            <NewCommentForm
              addComment={handleAddComment}
              setInputName={setInputName}
              setInputEmail={setInputEmail}
              setInputBody={setInputBody}
              isLoading={loadingComments}
              inputName={inputName}
              inputBody={inputBody}
              inputEmail={inputEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
};
