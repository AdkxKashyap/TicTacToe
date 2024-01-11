import Cookies from 'universal-cookie';
import './App.css';
import serverClient from './utils/StreamChat.js';
import UserAuthContainer from './Components/UserAuthContainer.jsx';
import { useState } from 'react';
import { Chat } from "stream-chat-react";
import JoinGame from './Components/JoinGame.jsx';

const logoutButtonClasses = "bg-orange-500 text-white py-2 px-4 rounded";
const loggedInText = "text-gray-600 mr-2";
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
    ).then(() => { setIsAuthenticated(true); });
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
          <div className='userStatusContainer'>
            <p className={loggedInText}>{`Logged in as: ${cookies.get('userName')}`}</p>
            <button className={logoutButtonClasses} onClick={handleLogOut}>LogOut</button>
          </div>
        </Chat>
      ) :
        <UserAuthContainer setIsAuth={setIsAuthenticated} />
      }

    </div>
  );
}

export default App;
