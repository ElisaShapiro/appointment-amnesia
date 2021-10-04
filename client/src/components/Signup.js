import { useState } from "react"
import { NavLink } from "react-router-dom"

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'

function Signup({ setUser }){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    function handleChange(event) {
        setFormData({...formData, 
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let data = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation
        }
        console.log('usercreate',data)
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            if (json.errors) {
                alert(json.errors)
            }
            else {
                setUser(json)
            }
        })
    }


    return(
        <Container sx={{paddingTop: '124px'}}>
            <Box container
                component={Grid}
                justifyContent='center'
                boxShadow={3}
                alignItems='end'
                sx={{
                    width: 510,
                    height: 510,
                    backgroundImage: `url(${"https://i.imgur.com/p2GWN6M.png"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto'
                }}
            >                   
                <form onSubmit={handleSubmit}>
                    <Grid item
                    >
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name} 
                            onChange={handleChange}
                            sx={{width: 218}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <TextField
                            type="text"
                            id="email"
                            name="email"
                            label="Email"
                            value={formData.email} 
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
                            value={formData.password} 
                            onChange={handleChange}
                            sx={{width: 218}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <TextField
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Confirm Password"
                            value={formData.password_confirmation} 
                            onChange={handleChange}
                            sx={{width: 218}}
                        />
                    </Grid>
                    <Grid item
                    >
                        <Button type="submit" variant="outlined" sx={{width: 218, color: "#666666", border: '1px solid #666666', textAlign: "center"}}>Register</Button>
                    </Grid>
                    <Grid item
                    >
                        <Button variant="outlined" sx={{width: 218, color: "#666666", border: '1px solid #666666', textAlign: "center"}} component={NavLink} to="/login">
                            {"Have an account?"}<br/>{"Log In"}
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default Signup;