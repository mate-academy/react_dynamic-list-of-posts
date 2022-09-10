import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Comment } from '../Comment/Comment';
import { Loader } from '../Loader/Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

import { fetchPostComments } from '../../redux/slices/commentSlice';

import { TRootDispatch, TRootState } from '../../redux/store';
import { EStatus } from '../../types/Status.enum';
import { Notification } from '../Notification/Notification';

export const Comments: React.FC = () => {
  const {
    comments,
    status,
  } = useSelector((state: TRootState) => state.comments);
  const { currentPost } = useSelector((state: TRootState) => state.posts);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const dispatch: TRootDispatch = useDispatch();

  useEffect(() => {
    if (!currentPost) {
      return;
    }

    dispatch(fetchPostComments(currentPost.id));

    // eslint-disable-next-line consistent-return
    return () => setIsFormVisible(false);
  }, [currentPost]);

  if (!currentPost) {
    return null;
  }

  return (
    <>
      <div className="block">
        {status === EStatus.PENDING && (
          <Loader />
        )}

        {status === EStatus.ERROR && (
          <Notification
            isStyle="is-danger"
            message="Something went wrong during comments loading!"
            cypressData="CommentsError"
          />
        )}

        {status === EStatus.SUCCESS && (
          !comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )
            : comments.map(comment => (
              <Comment comment={comment} key={comment.id} />
            ))
        )}

        {!isFormVisible && status === EStatus.SUCCESS && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormVisible && (
        <NewCommentForm postId={currentPost.id} />
      )}
    </>
  );
};
