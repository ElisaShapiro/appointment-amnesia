import { useState } from "react"
// import { useHistory } from "react-router-dom"

import { Button, Container, Input, Typography } from '@mui/material'

function Signup({ setUser }){
    // const history = useHistory()
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
                // history.push("/")
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
                    value={formData.name} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Typography>Email:</Typography>
                <Input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Typography>Password:</Typography>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Typography>Confirm Password:</Typography>
                <Input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation} 
                    onChange={handleChange}
                >
                </Input>
                <br /><Button type="submit">Register</Button>
            </form>
        </Container>
    )
}

export default Signup;