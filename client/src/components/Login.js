import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"

import { Box, Button, Container, Grid, TextField } from '@mui/material'


function Login({ setUser } ){
    const history = useHistory()

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    function handleChange(event) {
        setLoginInfo({ ...loginInfo,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error) {
                alert(data.error)
            } else {
                setUser(data)
                history.push("/")
            }
        })
    }


    return(
        <Container sx={{paddingTop: '124px'}}>
            <Box container
                variant='home'
                component={Grid}
                justifyContent='center'
                boxShadow={3}
                alignItems='end'
                sx={{
                    width: 510,
                    height: 510,
                    backgroundImage: `url(${"https://i.imgur.com/Gu5dd6u.png"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto',
                }}
            >   
                <form onSubmit={handleSubmit}>
                    <Grid item
                    >
                        <TextField
                            type='text'
                            id='name'
                            name='name'
                            label='Name'
                            value={loginInfo.name} 
                            onChange={handleChange}
                            sx={{width: 218, background: "#FFF"}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <TextField 
                            type='password'
                            id='password'
                            name='password'
                            label='Password'
                            value={loginInfo.password} 
                            onChange={handleChange}
                            sx={{width: 218, background: "#FFF"}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <Button type='submit' variant='contained' sx={{width: 218, color: '#666666', border: '1px solid #666666', textAlign: 'center'}}>Login</Button>
                    </Grid>
                    <Grid item
                        sx={{paddingTop:'120px', paddingBottom: '16px'}}
                    >
                        <Button variant='contained' sx={{color: '#666666', border: '1px solid #666666', textAlign: 'center'}} component={NavLink} to='/signup'>
                            {"Don't have an account?"}<br/>{"Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default Login;