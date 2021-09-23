import { useState, useEffect } from 'react'
import EventDetail from './EventDetail'
import AddEventForm from './AddEventForm'

function Events(){
    const [events, setEvents] = useState([])
    // const [addEvents, setAddEvents] = useState([])

    //GET events
    useEffect(() => {
        fetch('/events')
        .then(response => response.json())
        .then(data => setEvents(data))
    }, [])

    
    return(
        <div className="events-div">
            {events.length > 1 && events.map((oneEvent) => {
                return (
                    <div className="event-detail-div" key={oneEvent.id} style={{backgroundColor: "blue", margin: "10px"}}>
                        <EventDetail oneEvent={oneEvent}/>
                        <button>EDIT</button>
                        <button>DELETE</button>
                    </div>
                )
            })}
           <AddEventForm setEvents={setEvents}/>
        </div>
    )
}

export default Events;