import React, { useState, useEffect } from 'react';
import usersImage from './usersImages.json';
import usersList from './api/users.json';
import './App.scss';
import { Carousel } from './components/Carousel';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';


const App = () => {

  const [users, setUsers] = useState(null)
  const [chosenAuthor, setAuthor] = useState(null)

  useEffect(() => {
    const newObject = usersList.map(user => {
      const { id, name, email, address } = user;
      const image = usersImage.find(obj => obj[user.id])[id];
      return {
        id,
        name,
        email,
        address,
        image
      };
    })

    setUsers(newObject)
  }, [])


  return (users &&
    <div className="App">
      <header className="App__header">
        {console.log(chosenAuthor)}
      </header>

      <main className="App__main">
        <Carousel
          users={users}
          callBack={setAuthor}
        />
      </main>
    </div>
  )
};

export default App;
