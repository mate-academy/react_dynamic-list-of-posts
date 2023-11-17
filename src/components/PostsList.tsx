import React, { useContext } from 'react';
import cn from 'classnames';
import { Context } from './Context/Context';

type Props = {
  setIsShownSideBar: (value: boolean) => void;
  getComments: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({
  setIsShownSideBar,
  getComments,
}) => {
  const {
    postId,
    posts,
    setPostId,
    setIsShownForm,
  } = useContext(Context);

  const handleClick = (id: number) => {
    if (postId === id) {
      setIsShownSideBar(false);
      setPostId(0);
    } else {
      getComments(id);
      setIsShownSideBar(true);
      setPostId(id);
      // setPostId(0);
    }
  };

  return (
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
          {posts.map(post => {
            const { title, id } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': postId !== id,
                    })}
                    onClick={() => {
                      handleClick(id);
                      setIsShownForm(false);
                    }}
                  >
                    {postId === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
