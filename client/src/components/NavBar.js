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
            history.push('/login')
            }
        });          
    }
    
    return(
        <div className="navbar-div">
            <button className="navbar-button">
                <NavLink exact to="/">
                    Home
                </NavLink>
            </button>
            {user ?
            <button className="navbar-button" onClick={handleLogoutClick}>Logout</button>
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