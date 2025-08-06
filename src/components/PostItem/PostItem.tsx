import React, { useContext } from 'react';
import { Post } from '../../types/Post';
import { CommentsContext } from '../../Context/CommentsContext';
import classNames from 'classnames';
import { CurrentPostContext } from '../../Context/CurrentPostContext';
import { SidebarContext } from '../../Context/SidebarContext';

type PostItemProps = {
  postItem: Post;
};

export const PostItem: React.FC<PostItemProps> = ({ postItem }) => {
  const { onCommentsList } = useContext(CommentsContext);
  const { selectedPost, setSelectedPost } = useContext(CurrentPostContext);
  const { setSidebar } = useContext(SidebarContext);

  const handlePost = (event: React.MouseEvent<HTMLButtonElement>) => {
    // debugger;
    event.preventDefault();
    setSelectedPost(null);
    setSidebar(true);

    if (selectedPost?.id === postItem.id) {
      setSidebar(false);
      setSelectedPost(null);
    } else {
      onCommentsList(postItem);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{postItem.id}</td>

      <td data-cy="PostTitle">{postItem.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': postItem.id !== selectedPost?.id,
          })}
          onClick={handlePost}
        >
          {`${postItem.id !== selectedPost?.id ? 'Open' : 'Close'}`}
        </button>
      </td>
    </tr>
  );
};
