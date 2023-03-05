import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Comments } from '../Comments';
import { IPost } from '../../types/IPost';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPostComments } from '../../app/thunks';

type Props = {
  post: IPost;
};

export const PostDetails: FunctionComponent<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchPostComments(post.id));
  }, [post.id, dispatch]);

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
        {!loaded ? (
          <Loader />
        ) : (hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ))}

        {loaded && !hasError && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <Comments />
        )}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm postId={post.id} />
        )}
      </div>
    </div>
  );
};
