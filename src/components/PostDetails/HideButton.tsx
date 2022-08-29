import { useAppSelector } from "../../hooks/useAppSelector";

export const HideButton: React.FC = () => {
  const { comments } = useAppSelector(state => state.commentsSlice);

  return (
    <button
      type="button"
      className="button"
    >
      Hide {comments.length !== 0 && comments.length} {comments.length === 1 ? 'comment' : 'comments'}
    </button>
  );
};
