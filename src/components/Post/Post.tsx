export const Post: React.FC = () => {
  return (
    <tr data-cy="Post">
      <td data-cy="PostId">17</td>

      <td data-cy="PostTitle">
        fugit voluptas sed molestias voluptatem provident
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className="button is-link is-light"
        >
          Open
        </button>
      </td>
    </tr>
  );
};
