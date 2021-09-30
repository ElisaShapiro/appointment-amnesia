import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';
import SearchBar from './SearchBar';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';



function Events({ user, universalCategories }){
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
    useEffect(()=>{
        if (user && user.user_categories.length > 0) {
            setEventCategories(user.user_categories)
        }
    }, [user])

    const [eventTimeValue, setEventTimeValue] = useState(new Date())

    function handleClickEdit(e){
        const editedEvent = events.filter((event) => event.id == e.target.value)[0]
        // let formDataEvent = {...editedEvent, category: editedEvent.category.category_name}
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
        const selectedCategory = universalCategories.filter((category) => {
            if (typeof formData.category == 'string') {
                return category.category_name == formData.category
            } else {
                return category.category_name == formData.category.category_name
            }
        })[0]
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

    const [searchEvents, setSearchEvents] = useState("")
    const [sortEventCategory, setSortEventCategory] = useState("All")
    const [sortEventSeverity, setSortEventSeverity] = useState("All")
    const filteredEvents = events.filter(event => {
        if (searchEvents.length > 0) {
            return event.content.toLowerCase().includes(searchEvents.toLowerCase())
        } else {
            return true
        }
    }).filter((event) => {
        if (sortEventCategory === "All") {
            return true
        } else if (event.category.category_name.toLowerCase() === sortEventCategory.toLowerCase()) {
            return true
        } else {
            return false
        }
    }).filter((event) => {
        if (sortEventSeverity ==="All") {
            return true
        } else if (event.severity === parseInt(sortEventSeverity)) {
            return true
        } else {
            return false
        }
    })

   
    
    return(
        <div>
            <div className="searchbar-div"> 
                <SearchBar search={searchEvents} setSearch={setSearchEvents}
                    type={"events"} setSortOther={setSortEventSeverity} 
                    categories={eventCategories} setSortCategory={setSortEventCategory}/>
            </div>    
            <div className="events-div">
            <Container>
                {filteredEvents.map((oneEvent) => {
                    return (
                        <Card key={oneEvent.id}>
                            <EventDetail oneEvent={oneEvent}/>
                            <Button size="small" color="primary" value={oneEvent.id} onClick={handleClickEdit}>EDIT</Button>
                            <Button size="small" color="primary" value={oneEvent.id} onClick={handleDeleteEvent}>DELETE</Button>
                        </Card>
                    )
                })}
            </Container>
            <AddEventForm 
                setEventTimeValue={setEventTimeValue}
                eventTimeValue={eventTimeValue}
                universalCategories={universalCategories}
                formData={formData} 
                setFormData={setFormData}
                manageFormData={manageFormData} 
                handleSubmit={handleSubmit}
            />
            </div>
        </div>
    )
}

export default Events;