import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventDetail from './EventDetail';
import AddEventForm from './AddEventForm';

function Events(){
    const history = useHistory()
    const [events, setEvents] = useState([])
    

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
                        <button>EDIT</button>
                        <button value={oneEvent.id} onClick={handleDeleteEvent}>DELETE</button>
                    </div>
                )
            })}
           <AddEventForm setEvents={setEvents}/>
        </div>
    )
}

export default Events;