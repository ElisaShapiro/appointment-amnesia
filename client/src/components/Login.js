import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"

import { Button, Container, Grid, TextField, Typography } from '@mui/material'


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
            <Grid container
                justifyContent='center'
            >   
            <Grid item 
                justifyContent='center'
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
                        <Button type="submit" variant="outlined" sx={{width: 218, textAlign: "center"}}>Login</Button>
                    </Grid>
                    <Grid item
                    >
                        <Button variant="outlined" sx={{textAlign: "center"}} component={NavLink} to="/signup">
                            {"Don't have an account?"}<br/>{"Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}

export default Login;