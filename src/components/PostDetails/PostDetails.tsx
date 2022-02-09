import { useEffect, useState } from 'react';
import { getPostsDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isHideComments, setIsHideComments] = useState(false);

  const loadComments = async () => {
    const postComments = await getPostComments(selectedPostId);

    setComments(postComments);
  };

  useEffect(
    () => {
      const getSelectedPost = async () => {
        const postDetails = await getPostsDetails(selectedPostId);

        setPost(postDetails);
      };

      if (selectedPostId) {
        getSelectedPost();
        loadComments();
      }
    },
    [selectedPostId],
  );

  const handleTogglerComments = () => {
    setIsHideComments(!isHideComments);
  };

  const deleteSelectedComment = async (commentId: number) => {
    await deleteComment(commentId);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {isHideComments
          ? (
            <button
              type="button"
              className="button PostDetails__show-button"
              onClick={handleTogglerComments}
            >
              {`Show ${comments.length === 1
                ? '1 comment'
                : `${comments.length} comments`
              }`}
            </button>
          )
          : (
            <>
              <button
                type="button"
                className="button"
                onClick={handleTogglerComments}
              >
                {`Hide ${comments.length === 1
                  ? '1 comment'
                  : `${comments.length} comments`
                }`}
              </button>

              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteSelectedComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm selectedPostId={selectedPostId} loadComments={loadComments} />
        </div>
      </section>
    </div>
  );
};
