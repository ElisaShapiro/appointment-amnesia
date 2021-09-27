import './App.css';
import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Events from './components/Events';
import Appointments from './components/Appointments';
import Medications from './components/Medications';

function App() {
  const [user, setUser] = useState(null)
  
  // async
    useEffect(() => {
    // auto-login
    // await 
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
          });
        }
      });
    }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/">
            <Home user={user} setUser={setUser}/>
          </Route>
          <Route path="/login">
            <Login setUser={setUser}/>
          </Route>    
          <Route path="/signup">
            <Signup setUser={setUser}/>
          </Route>
          <Route path="/profile">
            <Profile user={user}/>
          </Route>
          <Route path="/events">
            <Events user={user}/>
          </Route>
          <Route path="/appointments">
            <Appointments user={user} />
          </Route>
          <Route path="/medications">
            <Medications user={user} />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
