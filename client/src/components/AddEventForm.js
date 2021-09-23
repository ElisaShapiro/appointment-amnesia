import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AddEventForm(){
    const history = useHistory()
    const [formData, setFormData] = useState({
        // category: "",
        content: "",
        severity: "",
        // time: ""
    })

    function manageFormData(e) {
        let key = e.target.name
        let value = e.target.value
   
        setFormData({
          ...formData,
          [key]: value
        })
    }

    async function handleSubmit (e) {
        e.preventDefault()
        console.log(formData)
        await fetch(`/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            history.go("/events")
        })
        setFormData({
            // category: "",
            content: "",
            severity: "",
            // time: ""
       })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label htmlFor="category"> Category</label>
                    <input onChange={manageFormData} type="text" name="category" value={formData.category} placeholder="category" />
                </div> */}
                <div>
                    <label htmlFor="content"> What Happened?</label>
                    <input onChange={manageFormData} type="text" name="content" value={formData.content} placeholder="content" />
                </div>
                <div>
                    <label htmlFor="severity"> Severity</label>
                    <input onChange={manageFormData} type="number" name="severity" value={formData.severity} placeholder="#" min="1" max="5"/>
                </div>
                {/* <div>
                    <label htmlFor="time"> Time</label>
                    <input onChange={manageFormData} type="text" name="time" value={formData.time} placeholder="time" />
                </div> */}
                <div>
                    <button type="submit">Submit new event</button>
                </div>
            </form>
        </div>
    )
}
export default AddEventForm;