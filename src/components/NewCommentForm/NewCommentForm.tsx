import React, { useState } from 'react';
import './NewCommentForm.scss';
import { NewCommentFormUi } from './NewCommentFormUI';

type Props = {
  handleAdd: (comment: NewComment) => void
  selectedPostId: number
};

export const NewCommentForm: React.FC<Props> = ({ handleAdd, selectedPostId }) => {
  const [comment, setComment] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
    postId: 0,
  });

  const clearState = () => {
    setComment({
      name: '',
      email: '',
      body: '',
      postId: 0,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleOnSubmit = () => {
    const post:NewComment = { ...comment, postId: selectedPostId };

    clearState();
    handleAdd(post);
  };

  return (
    <NewCommentFormUi
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      name={comment.name}
      email={comment.email}
      body={comment.body}
    />
  );
};
