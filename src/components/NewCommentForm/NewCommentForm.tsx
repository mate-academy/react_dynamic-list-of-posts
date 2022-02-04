import React, { useState } from 'react';
import './NewCommentForm.scss';
import { NewCommentFormUi } from './NewCommentFormUI';

type Props = {
  handleAdd: (comment: NewComment) => void
  selectedPostId: number
};

export const NewCommentForm: React.FC<Props> = ({ handleAdd, selectedPostId }) => {
  const [state, setState] = useState<NewComment>({
    name: '',
    email: '',
    body: '',
    postId: 0,
  });

  const clearState = () => {
    setState({
      name: '',
      email: '',
      body: '',
      postId: 0,
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = () => {
    const post:NewComment = { ...state, postId: selectedPostId };

    clearState();
    handleAdd(post);
  };

  return (
    <NewCommentFormUi
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      name={state.name}
      email={state.email}
      body={state.body}
    />
  );
};
