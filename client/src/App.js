import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Events from './components/Events';
import Appointments from './components/Appointments';
import Medications from './components/Medications';
import Footer from './components/Footer';
import Error from './components/Error';

import theme from './components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  const [user, setUser] = useState(null)
  const [hasUpdate, setHasUpdate] = useState(false)
  const [universalCategories, setUniversalCategories] = useState([])
  const [universalProviders, setUniversalProviders] = useState([])
  const [events, setEvents] = useState([])
  const [appointments, setAppointments] = useState([])
  const [medications, setMedications] = useState([])

  //GET requests
  useEffect(() => {
    if (user) {
      fetch('/categories')
      .then(response => response.json())
      .then(data => setUniversalCategories(data))
    }
  }, [hasUpdate, user])  

  useEffect(() => {
    if (user) {
      fetch('/providers')
      .then(response => response.json())
      .then(data => setUniversalProviders(data))
    }
  }, [hasUpdate, user])  
  
  useEffect(() => {
    if (user) {
      fetch('/events')
      .then(response => response.json())
      .then(data => setEvents(data))
    }
  }, [hasUpdate, user])

  useEffect(() => {
    if (user) {
      fetch('/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data))
    }
}, [hasUpdate, user])

  useEffect(() => {
    if (user) {
      fetch('/medications')
      .then(response => response.json())
      .then(data => setMedications(data))
    }
  }, [hasUpdate, user])


  // AUTOLOGIN
  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, [hasUpdate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar user={user} setUser={setUser} />
      <Offset />
      <Switch>
        <Route exact path="/">
          <Home user={user} setUser={setUser}
            hasUpdate={hasUpdate} setHasUpdate={setHasUpdate} 
            universalCategories={universalCategories} 
            universalProviders={universalProviders} 
          />
        </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>    
        <Route path="/signup">
          <Signup setUser={setUser}/>
        </Route>
        <Route path="/events">
          <Events user={user} events={events} 
            universalCategories={universalCategories} 
            hasUpdate={hasUpdate} setHasUpdate={setHasUpdate}
          />
        </Route>
        <Route path="/appointments">
          <Appointments user={user} 
            appointments={appointments} setAppointments={setAppointments}
            universalCategories={universalCategories} 
            universalProviders={universalProviders}
            hasUpdate={hasUpdate} setHasUpdate={setHasUpdate}

          />
        </Route>
        <Route path="/medications">
          <Medications user={user} medications={medications}
            hasUpdate={hasUpdate} setHasUpdate={setHasUpdate}
          />
        </Route>
        <Route component={Error} />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
