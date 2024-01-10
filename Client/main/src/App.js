import Cookies from 'universal-cookie';
import './App.css';
import serverClient from './utils/StreamChat.js';
import UserAuthContainer from './Components/UserAuthContainer.jsx';
import { useState } from 'react';
import { Chat } from "stream-chat-react";
import Game from './Components/Game.jsx';
import JoinGame from './Components/JoinGame.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) {
    serverClient.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('userName'),
      firstName: cookies.get('firstName'),
      lastName: cookies.get('lastName'),
      hashedPassword: cookies.get("hashedPassword"),
    },
      token
    ).then((user) => setIsAuthenticated(true));
  }
  const handleLogOut = () => {
    cookies.remove('token');
    cookies.remove('userName');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('hashedPassword');
    cookies.remove('userId');
    serverClient.disconnectUser();
    setIsAuthenticated(false);
  }
  return (
    <div className="App">
      {isAuthenticated ? (
        <Chat client={serverClient} >
          <JoinGame />
          <button onClick={handleLogOut}>LogOut</button>
          <Game />
        </Chat>
      ) :
        <UserAuthContainer setIsAuth={setIsAuthenticated} />
      }

    </div>
  );
}

export default App;
