import Cookies from 'universal-cookie';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import serverClient from './utils/StreamChat.js';
import UserAuthContainer from './Components/UserAuthContainer.jsx';

function App() {
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
    ).then((user) => console.log(user));
  }
  return (
    <div className="App">

      <UserAuthContainer />

    </div>
  );
}

export default App;
