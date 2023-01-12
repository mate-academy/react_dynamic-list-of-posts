import classNames from 'classnames';
import { FC } from 'react';
import { Post } from '../types/Post';

enum Button {
  OpenText = 'Open',
  Closetext = 'Close',
}

type Props = {
  post: Post,
  setSelectedPost: (arg: Post | null) => void,
  selectedPost: Post | null,
  prevPost: React.MutableRefObject<Post | null>,
};

export const PostContent: FC<Props> = ({
  post,
  setSelectedPost,
  selectedPost,
  prevPost,
}) => {
  const { id, title } = post;
  const isPostSelected = (el: Post) => el.id === selectedPost?.id;

  const handleOnClick = () => {
    if (prevPost && prevPost.current?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

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
          className={classNames(
            'button',
            'is-link',
            { 'is-light': !(isPostSelected(post)) },
          )}
          onClick={() => handleOnClick()}
        >
          {isPostSelected(post) ? Button.Closetext : Button.OpenText}
        </button>
      </td>
    </tr>
  );
};
