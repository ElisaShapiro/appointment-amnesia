import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddEventForm({ eventCategories, formData, setFormData, manageFormData, handleSubmit, setEventTimeValue, eventTimeValue}){
    const history = useHistory()
    // const [eventCategories, setEventCategories] = useState([])
    // const [formData, setFormData] = useState({
    //     category: "",
    //     content: "",
    //     severity: "",
    //     event_time: ""
    // })
    // const [eventTimeValue, setEventTimeValue] = useState(new Date())

    // function manageFormData(e) {
    //     let key = e.target.name
    //     let value = e.target.value
   
    //     setFormData({
    //       ...formData,
    //       [key]: value
    //     })
    // }

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     const selectedCategory = eventCategories.filter((category) => category.category_name == formData.category)[0]
    //     const newFormData = {...formData, category_id: selectedCategory.id}
    //     await fetch(`/events`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newFormData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         history.go("/events")
    //     })
    //     setFormData({
    //         content: "",
    //         severity: "",
    //    })
    // }

    // useEffect(() => {
    //     fetch('/categories')
    //     .then(response => response.json())
    //     .then(data => setEventCategories(data))
    // }, [])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="category"> Category</label>
                    <select onChange={manageFormData} type="select" name="category" value={formData.category.category_name} placeholder="category">
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
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date and Time of Event"
                            value={eventTimeValue}
                            onChange={(newEventTimeValue) => {
                                setFormData({...formData, event_time: newEventTimeValue})
                                setEventTimeValue(newEventTimeValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <button type="submit">Submit Event</button>
                </div>
            </form>
        </div>
    )
}
export default AddEventForm;