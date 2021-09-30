import Login from './Login'
import Profile from './Profile';

function Home({ user, setUser, setHasUpdate, hasUpdate }){

    return(
        <div>
            {user ?
            <Profile user={user}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}
             />
            : 
            <>
            "Login or Signup"
            <Login setUser={setUser}/>
            </>
            }
        </div>
    )
}

export default Home;