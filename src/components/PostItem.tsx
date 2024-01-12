import classNames from 'classnames';
import { Post } from '../types/Post';
import { ButtonText } from '../enum/ButtonText';

type Props = {
  post: Post,
  postButton: (value: number) => void,
  idButton: number | undefined,
};

export const PostItem: React.FC<Props> = ({
  post,
  idButton,
  postButton,
}) => {
  const { id, title } = post;
  const verifyId = id !== idButton;

  return (
    <tbody>
      <tr data-cy="Post">
        <td data-cy="PostId">
          {id}
        </td>

        <td data-cy="PostTitle">
          {title}
        </td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={classNames('button is-link', {
              'is-light': verifyId,
            })}
            onClick={() => postButton(id)}
          >
            {!verifyId ? ButtonText.Close : ButtonText.Open}
          </button>
        </td>
      </tr>
    </tbody>
  );
};
