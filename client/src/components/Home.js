import { NavLink } from 'react-router-dom'
import Login from './Login'
import Profile from './Profile';

import { Box, Button, Grid, Typography } from '@mui/material'

function Home({ user, setUser, setHasUpdate, hasUpdate }){

    return(
        <div>
            {user ?
            <Profile user={user}
                hasUpdate={hasUpdate} setHasUpdate={setHasUpdate} 
             />
            : 
            <Box container
                component={Grid}
                justifyContent='center'
                boxShadow={3}
                sx={{
                    width: 510,
                    height: 264,
                    backgroundImage: `url(${"https://i.imgur.com/WrhF2yU.png"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto'
                }}
            >  
                <Grid item
                >
                    <Button variant="outlined" sx={{width: 218, color: "#666666", border: '1px solid #666666', textAlign: "center"}} component={NavLink} to="/login">
                        {"Have an account?"}<br/>{"Log In"}
                    </Button>
                </Grid>
                <Grid item
                >
                    <Button variant="outlined" sx={{color: "#666666", border: '1px solid #666666', textAlign: "center"}} component={NavLink} to="/signup">
                        {"Don't have an account?"}<br/>{"Sign Up"}
                    </Button>
                </Grid>
            </Box>
            }
        </div>
    )
}

export default Home;