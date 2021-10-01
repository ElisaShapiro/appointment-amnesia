import { useState } from "react"
import { useHistory } from "react-router-dom"

import { Button, Container, Input, Typography } from '@mui/material'

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
            <form onSubmit={handleSubmit}>
                <Typography>Name:</Typography>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={loginInfo.name} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Typography>Password:</Typography>
                <Input 
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Button type="submit">Login</Button>
            </form>
        </Container>
    )
}

export default Login;