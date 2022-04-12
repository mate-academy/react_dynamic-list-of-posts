import React, { useState, useEffect } from 'react';
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
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const fetchPost = async () => {
    const postItem = await getPost(selectedPostId);

    setPost(postItem);
  };

  const fetchComments = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const handleCommentRemove = async (commentId: number) => {
    await removeComment(commentId);
    await fetchComments();
  };

  useEffect(() => {
    const fetch = async () => {
      await Promise.all([fetchPost(), fetchComments()]);
    };

    fetch();
  }, [selectedPostId]);

  // useEffect(() => {
  //   fetchComments();
  // }, [post]);

  // eslint-disable-next-line no-console
  console.log(post);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>
      {comments.length > 0
        ? (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentsVisible(!isCommentsVisible)}
            >
              {isCommentsVisible
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            {isCommentsVisible && (
              <ul className="PostDetails__list">
                {comments.map(commentItem => (
                  <li className="PostDetails__list-item" key={commentItem.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleCommentRemove(commentItem.id)}
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
