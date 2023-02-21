import React, { ChangeEvent, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post,
  comments: Comment[],
  setComments: (value: Comment[]) => void,
  setPostComments: (value: Comment[])=> void,
  postComments: Comment[],
};

export const NewCommentForm: React.FC<Props> = ({
  post, comments, setComments, setPostComments, postComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [noName, setNoName] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [noBody, setNoBody] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const clearInputs = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
  };

  const addComment = async () => {
    if (authorName.length <= 0) {
      setNoName(true);

      return;
    }

    if (authorEmail.length <= 0) {
      setNoEmail(true);

      return;
    }

    if (commentBody.length <= 0) {
      setNoBody(true);

      return;
    }

    setIsLoadingButton(true);
    const commentResponse = client.post('/comments', {
      postId: post.id,
      name: authorName,
      email: authorEmail,
      body: commentBody,
    });
    const commentResult = await commentResponse as Comment;

    setComments([...comments, commentResult]);
    setPostComments([...postComments, commentResult]);
    setCommentBody('');
    setIsLoadingButton(false);
  };

  const setInputValue = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setNoValue: (value: boolean)=> void,
    setAuthorValue:(value: string)=> void,
  ) => {
    setNoValue(false);
    setAuthorValue(event.target.value);
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${noName && 'is-danger'}`}
            value={authorName}
            onChange={(e) => {
              setInputValue(e, setNoName, setAuthorName);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {noName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {noName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
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
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${noEmail && 'is-danger'}`}
            value={authorEmail}
            onChange={(e) => {
              setInputValue(e, setNoEmail, setAuthorEmail);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {noEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) }
        </div>
        {noEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
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
            name="body"
            placeholder="Type comment here"
            className={`textarea ${noBody && 'is-danger'}`}
            value={commentBody}
            onChange={(e) => {
              setInputValue(e, setNoBody, setCommentBody);
            }}
          />
        </div>
        {noBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={addComment}
            type="button"
            className={`button is-link ${isLoadingButton && 'is-loading'}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
