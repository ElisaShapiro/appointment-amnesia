import { NavLink, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { AppBar, Avatar, Button, styled, Toolbar, Typography } from '@mui/material';

function NavBar({ user, setUser }){
    const history = useHistory()
    
    //logout
    function handleLogoutClick() {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
            setUser(null);
            history.push('/')
            }
        });          
    }
    
    return(
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography>
                    Today is {format(new Date(), "eeee MMMM d',' y")}
                </Typography>
                {user ?
                <>
                <Avatar alt="profile picture" src={user.avatar} 
                    sx={{ height: 30, width: 30 }}
                />
            <NavLink exact to="/" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    <Typography>Welcome, {user.name}</Typography>
                </Button>
            </NavLink>
            <NavLink to="/events" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    Events
                </Button>
            </NavLink>
            <NavLink to="/appointments" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    Appointments
                </Button>
            </NavLink>
            <NavLink to="/medications" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    Medications
                </Button>
            </NavLink>
            <Button color="buttonColor" className="navbar-button" onClick={handleLogoutClick}>Logout</Button>
        </>
        :
        <>
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    Login
                </Button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                <Button color="buttonColor" className="navbar-button">
                    Register
                </Button>
            </NavLink>
            </>
            }
            </Toolbar>
        </AppBar>
    )




}

export default NavBar;