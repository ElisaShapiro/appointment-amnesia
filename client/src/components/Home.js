import { NavLink } from 'react-router-dom';
import Profile from './Profile';

import { Box, Button, Container, Grid, Typography } from '@mui/material'

function Home({ user, setUser, setHasUpdate, hasUpdate,
    universalCategories, setUniversalCategories, universalProviders, setUniversalProviders }){

    return(
        <div>
            {user ?
                <Profile user={user}
                    hasUpdate={hasUpdate} setHasUpdate={setHasUpdate} 
                    universalCategories={universalCategories} 
                    setUniversalCategories={setUniversalCategories}
                    universalProviders={universalProviders} 
                    setUniversalProviders={setUniversalProviders}
                />
            : 
            <Container sx={{paddingTop: '124px'}}>
                <Box container
                    component={Grid}
                    justifyContent='center'
                    boxShadow={3}
                    alignItems='center'
                    sx={{
                        width: 510,
                        height: 510,
                        backgroundImage: `url(${"https://i.imgur.com/p2GWN6M.png"}`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'auto'
                    }}
                >
                <Grid item
                    sx={{padding: '192px 0px 0px 0px'}}
                >
                    <Typography gutterBottom color='#769fb6' variant='h2'>
                        A Medical Tracking App to Keep Your Thoughts in Order
                    </Typography>    
                </Grid>
                <Grid item>
                    <Button variant='outlined' sx={{width: 218, color: '#666666', border: '1px solid #666666', textAlign: 'center'}} component={NavLink} to='/login'>
                        {"Have an account?"}<br/>{"Log In"}
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='outlined' sx={{color: '#666666', border: '1px solid #666666', textAlign: 'left'}} component={NavLink} to='/signup'>
                        {"Don't have an account?"}<br/>{"Sign Up"}
                    </Button>
                </Grid>
                </Box>
            </Container>
            }
        </div>
    )
}

export default Home;