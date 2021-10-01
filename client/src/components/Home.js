import Login from './Login'
import Profile from './Profile';
import { Button, Container, Input, Typography } from '@mui/material'

function Home({ user, setUser, setHasUpdate, hasUpdate }){

    return(
        <div>
            {user ?
            <Profile user={user}
            setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}
             />
            : 
            <>
            <Typography>"No account? Login or Signup"</Typography>
            <Login setUser={setUser}/>
            </>
            }
        </div>
    )
}

export default Home;