import { useState, useEffect } from 'react'
import EventDetail from './EventDetail'
function Events(){
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/events')
        .then(response => response.json())
        .then(data => setEvents(data))
    }, [])

    

    return(
        <div className="events-div">
            {events.map((oneEvent) => {
                return (
                    <div className="event-detail-div" key={oneEvent.id} style={{backgroundColor: "blue", padding: "10px"}}>
                        <EventDetail oneEvent={oneEvent}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Events;