import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'


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
        <Container>
            <Box container
                component={Grid}
                justifyContent='center'
                boxShadow={3}
                sx={{
                    width: 510,
                    height: 404,
                    backgroundImage: `url(${"https://i.imgur.com/WrhF2yU.png"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto'
                }}
            >   
            <Grid item 
                justifyContent='center'
                paddingBottom='202px'
            >
                <Typography>Sign In</Typography>
            </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid item
                    >
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            value={loginInfo.name} 
                            onChange={handleChange}
                            sx={{width: 218}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <TextField 
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            value={loginInfo.password} 
                            onChange={handleChange}
                            sx={{width: 218}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <Button type="submit" variant="outlined" sx={{width: 218, color: "#666666", border: '1px solid #666666', textAlign: "center"}}>Login</Button>
                    </Grid>
                    <Grid item
                    >
                        <Button variant="outlined" sx={{color: "#666666", border: '1px solid #666666', textAlign: "center"}} component={NavLink} to="/signup">
                            {"Don't have an account?"}<br/>{"Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default Login;