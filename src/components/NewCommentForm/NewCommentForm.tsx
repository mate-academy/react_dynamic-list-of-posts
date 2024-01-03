import classNames from 'classnames';
import React, { useCallback, useContext, useState } from 'react';
import { Input } from '../common/Input';
import { IconsNames, InputTypes } from '../../libs/enums';
import { initialValues, initialErrorMessages } from './libs/initialFields';
import { getErrorMessages } from './libs/helpers';
import { addComment } from '../../api/comments';
import { actions } from '../../libs/actions/actions';
import { DispatchContext } from '../../store';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsValues, setFieldsValues] = useState(initialValues);
  const [
    fieldsErrorMessages, setFieldsErrorMessages,
  ] = useState(initialErrorMessages);

  const handleChangeFormValue = useCallback((name: string, value: string) => {
    setFieldsValues({
      ...fieldsValues,
      [name]: value,
    });

    setFieldsErrorMessages({
      ...fieldsErrorMessages,
      [name]: '',
    });
  }, [fieldsErrorMessages, fieldsValues]);

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const errorMessages = getErrorMessages(fieldsValues);
      const hasErrors = !!Object.keys(errorMessages).length;

      if (hasErrors) {
        setFieldsErrorMessages({ ...fieldsErrorMessages, ...errorMessages });

        return;
      }

      setIsLoading(true);
      actions.hideErrorMessage(dispatch);

      addComment({ postId, ...fieldsValues })
        .then((response) => {
          actions.addComment(dispatch, response);
        })
        .catch(() => {
          actions.hideAddCommentsForm(dispatch);
          actions.showErrorMessage(dispatch);
        })
        .finally(() => {
          setIsLoading(false);

          setFieldsValues({ ...fieldsValues, body: '' });
        });
    },
    [dispatch, fieldsErrorMessages, fieldsValues, postId],
  );

  const handleResetForm = useCallback(() => {
    setFieldsValues(initialValues);
    setFieldsErrorMessages(initialErrorMessages);
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
    >
      <Input
        inputName="name"
        label="Author Name"
        dataCy="NameField"
        id="comment-author-name"
        placeholder="Name Surname"
        errorMessage={fieldsErrorMessages.name}
        initialValue={fieldsValues.name}
        onChangeValue={handleChangeFormValue}
      />

      <Input
        inputType={InputTypes.Email}
        inputName="email"
        label="Author Email"
        dataCy="EmailField"
        id="comment-author-email"
        placeholder="email@test.com"
        iconName={IconsNames.Email}
        errorMessage={fieldsErrorMessages.email}
        initialValue={fieldsValues.email}
        onChangeValue={handleChangeFormValue}
      />

      <Input
        inputType={InputTypes.Textarea}
        inputName="body"
        label="Comment Text"
        dataCy="BodyField"
        id="comment-body"
        placeholder="Type comment here"
        errorMessage={fieldsErrorMessages.body}
        initialValue={fieldsValues.body}
        onChangeValue={handleChangeFormValue}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
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
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
