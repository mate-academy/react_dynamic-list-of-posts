import { useEffect, useState } from "react";
import { getUserByName } from "../../api/users";
import { useActions } from "../../hooks/useActions";

export const UserSelect: React.FC = () => {
  const [name, setName]  = useState('');
  const { selectUser } = useActions();

  useEffect(() => {
    (async function() {
      const user = await getUserByName(name);

      if (user.length !== 0) {
        selectUser(user[0]);
      } else {
        selectUser(null)
      }
    })()
  }, [name]);

  console.log(name);

  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          value={name}
          onChange={(event) => setName(event.target.value)}
        >
          <option value="">All users</option>
          <option value="Leanne Graham">Leanne Graham</option>
          <option value="Ervin Howell">Ervin Howell</option>
          <option value="Clementine Bauch">Clementine Bauch</option>
          <option value="Patricia Lebsack">Patricia Lebsack</option>
          <option value="Chelsey Dietrich">Chelsey Dietrich</option>
          <option value="Mrs. Dennis Schulist">Mrs. Dennis Schulist</option>
          <option value="Kurtis Weissnat">Kurtis Weissnat</option>
          <option value="Nicholas Runolfsdottir V">Nicholas Runolfsdottir V</option>
          <option value="Glenna Reichert">Glenna Reichert</option>
          <option value="Leanne Graham">Leanne Graham</option>
        </select>
      </label>
    </header>
  );
};
