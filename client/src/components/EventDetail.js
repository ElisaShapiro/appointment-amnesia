import { format } from 'date-fns';


function EventDetail({ oneEvent }){


    return(
        <div>
            <p>Category: {oneEvent.category.category_name}</p>
            <p>What happened? {oneEvent.content}</p>
            <p>Severity: {oneEvent.severity}</p>
            <p>Occurred: {format(new Date(oneEvent.event_time), "eee MMM'-'d'-'y h':'mm bbb") }</p>   
        </div>
    )
}

export default EventDetail;