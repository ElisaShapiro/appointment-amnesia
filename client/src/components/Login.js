import { useState } from "react"
import { useHistory } from "react-router-dom"

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
        <div>
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <br/>
                <label htmlFor="name">Name:</label><br/>
                <input type="text" name="name" className="input-field" id="name" value={loginInfo.name} onChange={handleChange} /><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" className="input-field" id="password" value={loginInfo.password} onChange={handleChange} /><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;