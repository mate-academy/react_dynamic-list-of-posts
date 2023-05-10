import { useEffect, useRef } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  filteredPosts: Post[] | [],
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
  isSelected: boolean,
  selectPost: (post: Post) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  filteredPosts,
  setIsSelected,
  isSelected,
  selectPost,
  selectedPost,
}) => {
  const changeValue = () => {
    setIsSelected(value => !value);
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      setIsSelected(true);
    } else {
      didMount.current = true;
    }
  }, [selectedPost]);

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
          {filteredPosts.map(post => (
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {(selectedPost === post)
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button is-link',
                        { 'is-light': !isSelected },
                      )}
                      onClick={() => {
                        selectPost(post);
                        changeValue();
                      }}
                    >
                      {isSelected && (selectedPost === post)
                        ? 'Close'
                        : 'Open'}
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button is-link',
                        'is-light',
                      )}
                      onClick={() => {
                        selectPost(post);
                        changeValue();
                      }}
                    >
                      {isSelected && (selectedPost === post)
                        ? 'Close'
                        : 'Open'}
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
