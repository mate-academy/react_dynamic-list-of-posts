import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { PostsContext } from '../../PostsContext';
import { CommentsList } from '../CommentsList';
import { Loader } from '../Loader';
import { Post } from '../../types/Post';
import { getPostDetails } from '../../api/posts';

export const PostDetails: FC = memo(() => {
  const {
    showComments, setShowComments, postComments, selectedPostId,
  } = useContext(PostsContext);
  const [loadedDetails, setLoadedDetail] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPostDetail = useCallback(async () => {
    setIsLoading(true);
    const detail = await getPostDetails(selectedPostId) || null;

    setLoadedDetail(detail);
    setIsLoading(false);
  }, [selectedPostId]);

  useEffect(() => {
    loadPostDetail();
  }, [selectedPostId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{loadedDetails?.body}</p>
      </section>

      {
        !!postComments.length && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {`${
                !showComments
                  ? 'Show'
                  : 'Hide'
              } ${postComments.length} comments`}
            </button>

            {showComments && <CommentsList />}
          </section>
        )
      }

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
});
