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

import theme from './components/Theme';
import { styled, ThemeProvider } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  const [user, setUser] = useState(null)
  const [universalCategories, setUniversalCategories] = useState([])
  const [universalProviders, setUniversalProviders] = useState([])
  const [hasUpdate, setHasUpdate] = useState(false)
  useEffect(() => {
    fetch('/categories')
    .then(response => response.json())
    .then(data => setUniversalCategories(data))
  }, [hasUpdate])  
  useEffect(() => {
    fetch('/providers')
    .then(response => response.json())
    .then(data => setUniversalProviders(data))
  }, [hasUpdate])  
  
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
    // <div className="App">
    <ThemeProvider theme={theme}>
      <NavBar user={user} setUser={setUser} />
      <Offset />
        <Switch>
          <Route exact path="/">
            <Home user={user} setUser={setUser}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}
            />
          </Route>
          <Route path="/login">
            <Login setUser={setUser}/>
          </Route>    
          <Route path="/signup">
            <Signup setUser={setUser}/>
          </Route>
          <Route path="/events">
            <Events user={user}
              universalCategories={universalCategories} 
              universalProviders={universalProviders} 
            />
          </Route>
          <Route path="/appointments">
            <Appointments user={user} 
              universalCategories={universalCategories} 
              universalProviders={universalProviders}
            />
          </Route>
          <Route path="/medications">
            <Medications user={user} 
              universalProviders={universalProviders}
            />
          </Route>
        </Switch>
      </ThemeProvider>
    // </div>
  );
}

export default App;
