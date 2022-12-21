import {
  FC,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { Comment } from '../../types/Comment';
import { CommentsContext } from '../CommentsContext';
import { PostsContext } from '../PostsContext';
import { BodyField } from './BodyField';
import { EmailInput } from './EmailInput';
import { FormButtons } from './FormButtons';
import { NameInput } from './NameInput';

export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

export const NewCommentForm: FC = () => {
  const { addCommentToServer } = useContext(CommentsContext);
  const { selectedPost } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);

  const shouldClear = useMemo(() => (
    name || email || body
  ), [name, email, body]);

  const handleNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      setIsNameValid(true);
    }, [],
  );

  const handleEmailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setIsEmail(true);
      setIsEmailValid(true);
    }, [],
  );

  const handleBodyChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBody(event.target.value);
      setIsBodyValid(true);
    }, [],
  );

  const handleReset = useCallback(() => {
    setName('');
    setEmail('');
    setBody('');
    setIsEmail(true);
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsBodyValid(true);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      let canSubmit = true;

      event.preventDefault();
      setIsLoading(() => true);

      if (!name.trim()) {
        setIsNameValid(false);
        canSubmit = false;
      }

      if (!email.trim()) {
        setIsEmail(false);
        canSubmit = false;
      }

      if (!emailPattern.test(email)) {
        setIsEmailValid(false);
        canSubmit = false;
      }

      if (!body.trim()) {
        setIsBodyValid(false);
        canSubmit = false;
      }

      if (canSubmit && selectedPost) {
        const newComment: Comment = {
          id: 0,
          postId: selectedPost.id,
          name,
          email,
          body,
        };

        await addCommentToServer(newComment);
        setBody('');
      }

      setIsLoading(() => false);
    }, [name, email, body],
  );

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <NameInput
        name={name}
        isNameValid={isNameValid}
        handleNameInput={handleNameInput}
      />

      <EmailInput
        email={email}
        isEmail={isEmail}
        isEmailValid={isEmailValid}
        handleEmailInput={handleEmailInput}
      />

      <BodyField
        body={body}
        isBodyValid={isBodyValid}
        handleBodyChange={handleBodyChange}
      />

      <FormButtons
        isLoading={isLoading}
        shouldClear={shouldClear}
        handleReset={handleReset}
      />
    </form>
  );
};
