import React, {
  FC, useState, useMemo, useCallback, useContext,
} from 'react';
import { EmailInput } from './EmailInput';
import { NameInput } from './NameInput';
import { emailPattern } from './NewCommentsForm.Constant';
import { TextArea } from './TextArea';
import { FormButtons } from './FormButtons';
import { CommentsContext } from '../CommentsProvider';
import { PostsContext } from '../PostsProvider';
import { Comment } from '../../types/Comment';

export const NewCommentForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [body, setBody] = useState('');
  const [isValidBody, setIsValidBody] = useState(true);
  const { addComment } = useContext(CommentsContext);
  const { selectedPost } = useContext(PostsContext);
  const shouldClear = useMemo(() => name || email || body, [name, email, body]);

  // handler for Name input field
  const handleNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      setIsValidName(true);
    }, [],
  );

  // handler for Email input field
  const handleEmailInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setIsEmail(true);
      setIsValidEmail(true);
    }, [],
  );

  // handler for Text area field
  const handleBodyChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBody(event.target.value);
      setIsValidBody(true);
    }, [],
  );

  // hanler of Clear button - clear of fields, remove errors
  const handleReset = useCallback(() => {
    setName('');
    setEmail('');
    setBody('');
    setIsValidBody(true);
    setIsValidEmail(true);
    setIsEmail(true);
    setIsValidName(true);
  }, []);

  // handler for submit action
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      let canSubmit = true;

      event.preventDefault();
      setIsLoading(() => true);

      if (!name.trim()) {
        setIsValidName(false);
        canSubmit = false;
      }

      if (!email.trim()) {
        setIsEmail(false);
        canSubmit = false;
      }

      if (!emailPattern.test(email)) {
        setIsValidEmail(false);
        canSubmit = false;
      }

      if (!body.trim()) {
        setIsValidBody(false);
        canSubmit = false;
      }

      if (canSubmit && selectedPost) {
        const tempComment: Comment = {
          id: 0,
          postId: selectedPost.id,
          name,
          email,
          body,
        };

        await addComment(tempComment);
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
        isValidName={isValidName}
        handleNameInput={handleNameInput}
      />

      <EmailInput
        isEmail={isEmail}
        email={email}
        isValidEmail={isValidEmail}
        handleEmailInput={handleEmailInput}
      />

      <TextArea
        body={body}
        isValidBody={isValidBody}
        handleBodyChange={handleBodyChange}
      />

      <FormButtons
        shouldClear={shouldClear}
        handleReset={handleReset}
        isLoading={isLoading}
      />
    </form>
  );
};
