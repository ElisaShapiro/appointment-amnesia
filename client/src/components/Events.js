import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';

function Events(){
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    
    const [eventCategories, setEventCategories] = useState([])
    const [formData, setFormData] = useState({
        category: "",
        content: "",
        severity: "",
        event_time: ""
    })
    const [eventTimeValue, setEventTimeValue] = useState(new Date())

    function handleClickEdit(e){
        const editedEvent = events.filter((event) => event.id == e.target.value)[0]
        setIsEdit(!isEdit)
        setFormData(editedEvent)
        setEventTimeValue(editedEvent.event_time)
    }
    function manageFormData(e) {
        let key = e.target.name
        let value = e.target.value
        if (isEdit) {
            setFormData({
                ...formData,
                [key]: value,
                id: formData.id
            })
        } else {
            setFormData({
                ...formData,
                [key]: value
            })
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const selectedCategory = eventCategories.filter((category) => category.category_name == formData.category)[0]
        const newFormData = {...formData, category_id: selectedCategory.id}
        if (isEdit) {
            fetch(`/events/${formData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFormData)
            })
            .then(response=>response.json())
            .then(data => {
                setIsEdit(false)
                history.go('/events')
            })
        } else {
            await fetch(`/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(newFormData)
            })
            .then(response => response.json())
            .then(data => {
                history.go("/events")
            })
            setFormData({
                content: "",
                severity: "",
            })
        }
    }

    useEffect(() => {
        fetch('/categories')
        .then(response => response.json())
        .then(data => setEventCategories(data))
    }, [])
    

    //GET events
    useEffect(() => {
        fetch('/events')
        .then(response => response.json())
        .then(data => setEvents(data))
    }, [])

    //DELETE events
    function handleDeleteEvent(e){
        fetch(`/events/${e.target.value}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        history.go("/events")
    }
    
    return(
        <div className="events-div">
            {events.length > 1 && events.map((oneEvent) => {
                return (
                    <div className="event-detail-div" key={oneEvent.id} style={{backgroundColor: "blue", margin: "10px"}}>
                        <EventDetail oneEvent={oneEvent}/>
                        <button value={oneEvent.id} onClick={handleClickEdit}>EDIT</button>
                        <button value={oneEvent.id} onClick={handleDeleteEvent}>DELETE</button>
                    </div>
                )
            })}
           <AddEventForm 
                setEventTimeValue={setEventTimeValue}
                eventTimeValue={eventTimeValue}
                eventCategories={eventCategories}
                formData={formData} setFormData={setFormData}
                manageFormData={manageFormData} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Events;