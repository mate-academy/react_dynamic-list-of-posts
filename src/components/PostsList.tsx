import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  selectedPostID: number,
  setSelectedPostID: (id: number) => void,
  setHasNewCommentForm: (has: boolean) => void
  setHasErrComments: (has: boolean) => void
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostID,
  setSelectedPostID,
  setHasNewCommentForm,
  setHasErrComments,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts.map(({ id, title }) => (
          <tr data-cy="Post" key={id}>
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">
              {title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={cn('button is-link',
                  { 'is-light': id !== selectedPostID })}
                onClick={() => {
                  setSelectedPostID(selectedPostID === id ? 0 : id);
                  setHasErrComments(false);
                  setHasNewCommentForm(false);
                }}
              >
                {id === selectedPostID ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
