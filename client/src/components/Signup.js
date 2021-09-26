import { useState } from "react"
// import { useHistory } from "react-router-dom"

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
        <div className="login-signup-form-wrapper">
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <br/>
                <label htmlFor="name" >Name:</label><br/>
                <input type="text" name="name" className="input-field" id="name" value={formData.name} onChange={handleChange} /><br/><br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="text" name="email" className="input-field" id="email" value={formData.email} onChange={handleChange} /><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" className="input-field" id="password" value={formData.password} onChange={handleChange} /><br/><br/>
                <label htmlFor="password_confirmation">Confirm Password:</label><br/>
                <input type="password" name="password_confirmation" className="input-field" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} /><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;