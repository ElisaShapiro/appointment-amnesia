import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';
import SearchBar from './SearchBar';

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
                type={"events"}
                setSortOther={setSortEventSeverity} 
                categories={eventCategories} setSortCategory={setSortEventCategory}/>
            </div>    
            <div className="events-div">
                {filteredEvents.map((oneEvent) => {
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