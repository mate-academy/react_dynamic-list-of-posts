import React, { useState, useEffect, useCallback } from 'react';
import { getPostComments, removeComment } from '../../api/Comments';
import { getPost } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = React.memo(({ selectedPostId }) => {
  const [post, setPost] = useState<PostItem | null>(null);
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [visibilityOfComments, setvisibilityOfComments] = useState(true);

  const fetchPost = useCallback(async () => {
    const postItem = await getPost(selectedPostId);

    setPost(postItem);
  }, []);

  const fetchComments = async () => {
    if (post) {
      const commentsFromServer = await getPostComments(post.id);

      setComments(commentsFromServer);
    }
  };

  const remove = async (id: number) => {
    await removeComment(id);
    await fetchComments();
  };

  useEffect(() => {
    fetchPost();
  }, [selectedPostId]);

  useEffect(() => {
    fetchComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>
      {comments.length > 0
        ? (
          <section className="PostDetails__comments">
            {visibilityOfComments && (
              <button
                type="button"
                className="button"
                onClick={() => setvisibilityOfComments(!visibilityOfComments)}
              >
                {`Hide ${comments.length} comments`}
              </button>
            )}

            {!visibilityOfComments && (
              <button
                type="button"
                className="button"
                onClick={() => setvisibilityOfComments(!visibilityOfComments)}
              >
                {`Show ${comments.length} comments`}
              </button>
            )}

            {visibilityOfComments && (
              <ul className="PostDetails__list">
                {comments.map(commentItem => (
                  <li className="PostDetails__list-item" key={commentItem.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => remove(commentItem.id)}
                    >
                      X
                    </button>
                    <p>{commentItem.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
        : 'No comments yet'}

      <section>
        <div className="PostDetails__form-wrapper">
          {post && (
            <NewCommentForm postId={post.id} fetchComments={fetchComments} />
          )}
        </div>
      </section>
    </div>
  );
});
