import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AddEventForm(){
    const history = useHistory()
    const [eventCategories, setEventCategories] = useState([])
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

    useEffect(() => {
        fetch('/categories')
        .then(response => response.json())
        .then(data => setEventCategories(data))
    }, [])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category"> Category</label>
                    <select onChange={manageFormData} type="select" name="category" value={formData.category} placeholder="category">
                        {eventCategories.map((eventCategory) => {
                            return(
                                <option key={eventCategory.id} name={eventCategory.category_name}>{eventCategory.category_name}</option>
                            )
                        })}
                    </select>
                </div>
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