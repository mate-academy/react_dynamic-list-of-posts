import React, { useState } from 'react';
import { addComment } from '../api/Comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
  comments: Comment[];
  setPostsComments: (comment: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setPostsComments,
}) => {
  const [commentData, setCommentData] = useState({
    authorName: '',
    authorEmail: '',
    commentText: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    authorName: '',
    authorEmail: '',
    commentText: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedName = commentData.authorName.trim();
    const trimedEmail = commentData.authorEmail.trim();
    const trimedText = commentData.commentText.trim();

    const errorsToUpdate = {
      authorName: !trimedName ? 'Name is required' : '',
      authorEmail: !trimedEmail ? 'Email is required' : '',
      commentText: !trimedText ? 'Enter some text' : '',
    };

    setErrors(errorsToUpdate);

    if (Object.values(errorsToUpdate).some(error => error)) {
      return;
    }

    setIsLoading(true);

    try {
      const newComment = await addComment({
        postId: postId,
        name: commentData.authorName,
        email: commentData.authorEmail,
        body: commentData.commentText,
      });

      setPostsComments([...comments, newComment]);
      setCommentData(prevData => ({ ...prevData, commentText: '' }));
      setErrors({ authorName: '', authorEmail: '', commentText: '' });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setCommentData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleClear = () => {
    setCommentData({ authorName: '', authorEmail: '', commentText: '' });
    setErrors({ authorName: '', authorEmail: '', commentText: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="authorName"
            value={commentData.authorName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errors.authorName && 'is-danger'}`}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.authorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.authorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.authorName}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="authorEmail"
            value={commentData.authorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.authorEmail && 'is-danger'}`}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.authorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.authorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.authorEmail}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="commentText"
            value={commentData.commentText}
            placeholder="Type comment here"
            className={`input ${errors.commentText && 'is-danger'}`}
            onChange={handleInputChange}
          />
        </div>

        {errors.commentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.commentText}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading && 'is-loading'}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={handleClear}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
