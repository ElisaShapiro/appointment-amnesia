// import { useState, useEffect } from 'react';
import Login from './Login'
import ProfileContainer from './ProfileContainer';

function Home({ user, setUser, setHasUpdate, hasUpdate }){

    return(
        <div>
            {user ?
            <ProfileContainer user={user}
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