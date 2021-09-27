import { NavLink, useHistory } from 'react-router-dom';

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
        <div className="navbar-div">
            {user ?
            <>
                <button className="navbar-button">
                    <NavLink exact to="/">
                        Welcome, {user.name}
                    </NavLink>
                    <img src={user.avatar} className="profile-pic" alt="Profile" style={{height: "12px", width: "12px" }} 
                    onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/3y8bjZJ.png"}}/>
                </button>
                <button className="navbar-button">
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </button>
                <button className="navbar-button">
                    <NavLink to="/events">
                        Events
                    </NavLink>
                </button>
                <button className="navbar-button">
                    <NavLink to="/appointments">
                        Appointments
                    </NavLink>
                </button>
                <button className="navbar-button">
                    <NavLink to="/medications">
                        Medications
                    </NavLink>
                </button>
                <button className="navbar-button" onClick={handleLogoutClick}>Logout</button>
            </>
            :
            <>
                <button className="navbar-button">
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </button>
                <button className="navbar-button">
                    <NavLink to="/signup">
                        Register
                    </NavLink>
                </button>
            </>
            }
        </div>
    )




}

export default NavBar;