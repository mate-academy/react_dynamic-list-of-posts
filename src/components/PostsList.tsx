import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  handleComments: (value: number) => void,
  setChoosePost: (value: boolean) => void,
  setIsNewComment: (value: boolean) => void,
};

enum ButtonText {
  Open = 'Open',
  Close = 'Close',
}

export const PostsList: React.FC<Props> = ({
  posts,
  handleComments,
  setChoosePost,
  setIsNewComment,
}) => {
  const [idButton, setIdButton] = useState<number | null>();
  // const [regulationButton, setRegulationButton] = useState(true);

  const postButton = (id: number) => {
    if (idButton === id) {
      setChoosePost(false);
      setIdButton(null);

      return;
    }

    setIsNewComment(false);
    handleComments(id);
    setIdButton(id);
  };

  const checkId = (id: number) => {
    return idButton !== id;
  };

  return (
    <div data-cy="PostsList">
      <p className="title ">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow ">
        <thead>
          <tr className="has-background-link-light ">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>
        {posts?.map(post => (
          <tbody
            key={post.id}
          >
            <tr data-cy="Post">
              <td data-cy="PostId">
                {post.id}
              </td>

              <td data-cy="PostTitle">
                {post?.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': checkId(post.id),
                  })}
                  onClick={() => postButton(post.id)}
                >
                  {!checkId(post.id) ? ButtonText.Close : ButtonText.Open}
                </button>
              </td>
            </tr>

            {/* <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">19</td>
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">20</td>
          <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr> */}
          </tbody>
        ))}

      </table>
    </div>
  );
};
