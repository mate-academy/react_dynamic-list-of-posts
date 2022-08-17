import { FC, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { apiHelper } from '../../api/apiHelper';

interface Props {
  postId: number,
}

export const PostDetails: FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    apiHelper(
      getPostDetails,
      postId,
      setIsLoading,
      setErrorMsg,
    ).then(setPost);
  }, [postId]);

  return (
    <>
      {post && !errorMsg && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post" data-cy="postDetails">
            <p>{post.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button type="button" className="button">Hide 2 comments</button>

            <ul className="PostDetails__list">
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>My first comment</p>
              </li>

              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>sad sds dfsadf asdf asdf</p>
              </li>
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </div>
      )}
      {isLoading && <Loader />}
      {errorMsg && <div>{`Something went wrong... ${errorMsg}`}</div>}
    </>
  );
};
