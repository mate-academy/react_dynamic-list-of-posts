import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import Post from 'models/Post';
import CommentsAsync from 'store/comments/commentsAsync';
import { selectComments } from 'store/comments/commentsSelectors';
import { commentsActions } from 'store/comments/commentsSlice';
import { NewCommentForm } from './NewCommentForm';
import CommentsList from './CommentsList';

type Props = {
  post: Post;
};

export const PostDetails:FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);

  const [visible, setVisible] = useState<boolean>(false);
  const handleVisible = () => setVisible((prev:boolean) => !prev);

  useEffect(() => {
    dispatch(CommentsAsync.fetchComments(post.id));

    return () => {
      dispatch(commentsActions.setInitialField('comments'));
    };
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        <CommentsList />

        {comments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className={`button is-link ${visible ? 'mb-4' : ''}`}
            onClick={handleVisible}
          >
            {visible ? 'Hide form' : 'Write a comment'}
          </button>
        )}

        {visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
