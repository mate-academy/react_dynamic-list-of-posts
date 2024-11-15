import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { PostsContext } from '../context/PostContext';
import { Comment } from '../types/Comment';

const initialState = {
  name: { value: '', error: '' },
  email: { value: '', error: '' },
  body: { value: '', error: '' },
};

export const useCommentForm = (
  handleAddComment: (comment: Omit<Comment, 'id'>) => Promise<void>,
) => {
  const { selectedPost } = useContext(PostsContext);

  const [state, setState] = useState(initialState);

  const setStateByInputName = (inputName = '', value = '', error = '') => {
    setState(prevState => ({
      ...prevState,
      [inputName]: {
        error,
        value,
      },
    }));
  };

  const [isLoading, setLoading] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = event.target;

      setStateByInputName(name, value, '');
    },
    [state],
  );

  const showErrors = () => {
    const { name, email, body } = state;

    if (!name.value) {
      setStateByInputName('name', '', 'Name is required');
    }

    if (!email.value) {
      setStateByInputName('email', '', 'Email is required');
    }

    if (!body.value) {
      setStateByInputName('body', '', 'Enter some text');
    }
  };

  const reset = () => {
    setState(initialState);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { name, email, body } = state;

    event.preventDefault();

    if (!(name.value && email.value && body.value)) {
      showErrors();

      return;
    }

    setLoading(true);

    const comment = {
      name: name.value,
      email: email.value,
      body: body.value,
      postId: selectedPost!.id,
    };

    handleAddComment(comment).then(() => {
      setStateByInputName('body', '', '');

      setLoading(false);
    });
  };

  return {
    isLoading,
    state,

    handleChange,
    reset,
    handleSubmit,
  };
};
