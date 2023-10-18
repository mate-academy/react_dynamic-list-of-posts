import { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from '../PostDetails';
import { ModalPostContext } from '../ModalPostContext';
import { CommentsProvider } from '../CommentsContext';

export const Sidebar: React.FC = () => {
  const { modalPost } = useContext(ModalPostContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        {
          'Sidebar--open': modalPost,
        },
      )}
    >
      {!!modalPost && (
        <div className="tile is-child box is-success ">
          <CommentsProvider>
            <PostDetails post={modalPost} />
          </CommentsProvider>
        </div>
      )}
    </div>
  );
};
