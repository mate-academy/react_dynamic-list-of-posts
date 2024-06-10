import React, { useContext, useState } from 'react';
import { CommentFieldEnum, Field } from './Field';
import { addComment } from '../utils/httpClient';
import { PostContext } from '../context/PostContextProvider';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

export interface CommentForm {
  name: string;
  email: string;
  text: string;
}

export interface CommentType {
  addCom: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<CommentType> = ({ addCom }) => {
  const [comment, setComment] = useState<CommentForm>({
    name: '',
    email: '',
    text: '',
  });
  const [commentError, setCommentError] = useState<CommentForm>({
    name: '',
    email: '',
    text: '',
  });
  const [isSending, setIsSending] = useState(false);

  const { post } = useContext(PostContext);

  const changeFieldHandler = (newStr: string, type: CommentFieldEnum) => {
    switch (type) {
      case CommentFieldEnum.EMAIL: {
        setComment(prev => {
          return {
            ...prev,
            email: newStr,
          };
        });

        break;
      }

      case CommentFieldEnum.NAME: {
        setComment(prev => {
          return {
            ...prev,
            name: newStr,
          };
        });

        break;
      }

      case CommentFieldEnum.TEXT: {
        setComment(prev => {
          return {
            ...prev,
            text: newStr,
          };
        });

        break;
      }
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!comment.email || !comment.name || !comment.text) {
      setCommentError({
        email: !comment.email ? 'Email is required' : '',
        name: !comment.name ? 'Name is required' : '',
        text: !comment.text ? 'Enter some text' : '',
      });

      return;
    }

    if (post) {
      setIsSending(true);

      addComment({
        id: 0,
        name: comment.name,
        email: comment.email,
        body: comment.text,
        postId: post.id,
      })
        .then(response => {
          addCom(response);

          setComment(prev => {
            return {
              ...prev,
              text: '',
            };
          });

          setCommentError({
            name: '',
            email: '',
            text: '',
          });
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  const clearHandle = () => {
    setComment({
      name: '',
      email: '',
      text: '',
    });

    setCommentError({
      name: '',
      email: '',
      text: '',
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmitHandler}>
      <Field
        title={comment.name}
        label="Author Name"
        error={commentError.name}
        changeField={changeFieldHandler}
        type={CommentFieldEnum.NAME}
      />

      <Field
        title={comment.email}
        label="Author Email"
        error={commentError.email}
        changeField={changeFieldHandler}
        type={CommentFieldEnum.EMAIL}
      />

      <Field
        title={comment.text}
        label="Comment Text"
        error={commentError.text}
        changeField={changeFieldHandler}
        type={CommentFieldEnum.TEXT}
        isTextArea={true}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSending,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearHandle}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
