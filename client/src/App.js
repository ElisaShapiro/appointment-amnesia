import './App.css';
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

import theme from './components/Theme';
import CssBaseline from '@mui/material/CssBaseline';
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
  
  const [events, setEvents] = useState([])
  useEffect(() => {
    fetch('/events')
    .then(response => response.json())
    .then(data => setEvents(data))
  }, [hasUpdate])

  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    fetch('/appointments')
    .then(response => response.json())
    .then(data => setAppointments(data))
}, [hasUpdate])

  const [medications, setMedications] = useState([])
  useEffect(() => {
    fetch('/medications')
    .then(response => response.json())
    .then(data => setMedications(data))
  }, [hasUpdate])


  // auto-login
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
          <Events user={user} events={events} setEvents={setEvents}
            universalCategories={universalCategories} 
            setUniversalCategories={setUniversalCategories}
            universalProviders={universalProviders} 
            setUniversalProviders={setUniversalProviders}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}
          />
        </Route>
        <Route path="/appointments">
          <Appointments user={user} 
            appointments={appointments} setAppointments={setAppointments}
            universalCategories={universalCategories} 
            universalProviders={universalProviders}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}

          />
        </Route>
        <Route path="/medications">
          <Medications user={user} 
            medications={medications} setMedications={setMedications}
            universalProviders={universalProviders}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}

          />
        </Route>
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
