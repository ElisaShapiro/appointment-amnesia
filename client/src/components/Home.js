// import { useState, useEffect } from 'react';
import Login from './Login'
import ProfileContainer from './ProfileContainer';

function Home({ user, setUser }){

    return(
        <div>
            {user ?
            <ProfileContainer />
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