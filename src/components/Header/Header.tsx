const users = [
  { id: 0, name: 'All users' },
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
  { id: 4, name: 'Patricia Lebsack' },
  { id: 5, name: 'Chelsey Dietrich' },
  { id: 6, name: 'Mrs. Dennis Schulist' },
  { id: 7, name: 'Kurtis Weissnat' },
  { id: 8, name: 'Nicholas Runolfsdottir V' },
  { id: 9, name: 'Glenna Reichert' },
];

type Props = {
  setUserSelected: React.Dispatch<React.SetStateAction<number>>;
  setShowDetails: React.Dispatch<React.SetStateAction<number | null>>;
};

export const Header: React.FC<Props> = (
  {
    setUserSelected,
    setShowDetails,
  },
) => {
  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          onChange={(e) => {
            setUserSelected(Number(e.target.value));
            setShowDetails(null);
          }}
        >
          {
            users.map(el => {
              return (
                <option value={el.id} key={el.id}>{el.name}</option>
              );
            })
          }
        </select>
      </label>
    </header>
  );
};
