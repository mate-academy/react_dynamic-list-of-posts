import { FC } from 'react';
import classNames from 'classnames';
import { Button } from '../../../index';
import { PostItemProps } from '../../../../types';

export const PostItem: FC<PostItemProps> = ({
  post,
  currentPostId,
  getComments,
}) => (
  <tr data-cy="Post">
    <td data-cy="PostId">{post.id}</td>

    <td data-cy="PostTitle">
      {post.title}
    </td>

    <td className="has-text-right is-vcentered">
      <Button
        type="button"
        dataCy="PostButton"
        className={classNames({ 'is-light': currentPostId !== post.id })}
        onClick={() => getComments(post)}
      >
        {currentPostId !== post.id ? 'Open' : 'Close'}
      </Button>
    </td>
  </tr>
);
